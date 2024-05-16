import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native';

const JobDetails = ({ route }) => {
  const { jobDetails } = route.params;

  if (!jobDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Under Maintenance</Text>
      </View>
    );
  }

  // Destructure jobDetails to access individual properties
  const {
    job_title,
    employer_name,
    job_city,
    job_state,
    job_country,
    job_employment_type,
    job_google_link,
    job_is_remote,
    job_posted_at_datetime_utc,
    job_publisher,
    job_min_salary,
    job_max_salary,
  } = jobDetails;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{job_title}</Text>
        <Text style={styles.detail}>Employer: <Text style={styles.detailValue}>{employer_name}</Text></Text>
        <Text style={styles.detail}>Location: <Text style={styles.detailValue}>{job_city}, {job_state}, {job_country}</Text></Text>
        <Text style={styles.detail}>Employment Type: <Text style={styles.detailValue}>{job_employment_type}</Text></Text>
        <Text style={styles.detail}>Remote: <Text style={styles.detailValue}>{job_is_remote ? "Yes" : "No"}</Text></Text>
        <Text style={styles.detail}>Posted on: <Text style={styles.detailValue}>{new Date(job_posted_at_datetime_utc).toLocaleDateString()} at {new Date(job_posted_at_datetime_utc).toLocaleTimeString()}</Text></Text>
        <Text style={styles.detail}>Publisher: <Text style={styles.detailValue}>{job_publisher}</Text></Text>
        <Text style={styles.detail}>Salary: <Text style={styles.detailValue}>{job_min_salary ? `$${job_min_salary}` : 'Not specified'} - {job_max_salary ? `$${job_max_salary}` : 'Not specified'}</Text></Text>
        <TouchableOpacity onPress={() => Linking.openURL(job_google_link)} style={styles.linkButton}>
          <Text style={styles.link}>View Job on Google</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  detailValue: {
    fontWeight: '600',
    color: '#333',
  },
  linkButton: {
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  link: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    textDecorationLine: 'none',
  },
});

export default JobDetails;
