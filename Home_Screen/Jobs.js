import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [searchedJobs, setSearchedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "JOBS",
    });
  }, [navigation]);

  const handleSearch = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const options = {
        method: "GET",
        url: "https://jsearch.p.rapidapi.com/search",
        params: {
          query: search,
          page: "1",
          num_pages: "1",
        },
        headers: {
          "X-RapidAPI-Key":
            "c61f39fcebmshf48b9b28697df2ep11552ajsnf2995c2b3808",
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      console.log("response data =", response.data);

      // Check if response contains data
      if (
        response.data &&
        Array.isArray(response.data.data) &&
        response.data.data.length > 0
      ) {
        const jobs = response.data.data;
        setSearchedJobs(jobs); // Set all job data
      } else {
        // Handle empty response or unexpected data structure
        setError("No jobs found");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again."); // Set error state
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Image
        source={require("../ProfileScreen/assets/pngegg1.png")}
        style={{ width: 54, height: 54, marginBottom: -20 }}
      />
      <TextInput
        style={styles.input}
        placeholder="Search Your Jobs here*"
        onChangeText={setSearch}
        value={search}
      />
      <TouchableOpacity onPress={handleSearch}>
        <Image
          source={require("../Events/search.png")}
          style={{
            width: 30,
            height: 30,
            alignSelf: "flex-end",
            marginRight: 59,
            marginTop: -29,
            marginBottom: 34,
          }}
        />
      </TouchableOpacity>

      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontWeight: 300,
            fontSize: 20,
            marginTop: -12,
            marginBottom: 12,
          }}
        >
          You looked for "{search}" jobs
        </Text>
        <ScrollView style={{}}>
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            searchedJobs.map((job, index) => (
              <TouchableOpacity
                key={index}
                style={styles.jobContainer}
                onPress={() =>
                  navigation.navigate("JobDetails", { jobDetails: job })
                }
              >
                <Text style={styles.jobTitle}>{job.job_title}</Text>
                <Text style={styles.jobDetail}>
                  Employer: {job.employer_name}
                </Text>
                <Text style={styles.jobDetail}>
                  Location: {job.job_city}, {job.job_state}, {job.job_country}
                </Text>
                <Text style={styles.jobDetail}>
                  Posted on: {new Date(job.job_posted_at_datetime_utc).toLocaleDateString()} at {new Date(job.job_posted_at_datetime_utc).toLocaleTimeString()}
                </Text>
                <Text style={styles.jobDetail}>
                  Salary: {job.job_min_salary ? `$${job.job_min_salary}` : 'Not specified'} - {job.job_max_salary ? `$${job.job_max_salary}` : 'Not specified'}
                </Text>
              </TouchableOpacity>
            ))
          )}
          {error && <Text style={{ color: "red" }}>{error}</Text>}
        </ScrollView>
      </View>
    </View>
  );
};

export default Jobs;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1.5,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: -20,
    marginLeft: -15,
    width: "50%",
    alignSelf: "center",
  },
  jobContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 5,
    marginBottom: 5,
  },
  jobTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  jobDetail: {
    fontSize: 14,
    marginTop: 5,
  },
});
