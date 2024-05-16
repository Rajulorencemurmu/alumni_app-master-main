import {createContext,useState,useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserType = createContext();

const UserContext = ({ children }) => {
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false); // Add isAdmin state

    const logout = async() => {
        try{
        await AsyncStorage.removeItem("userId");
         await AsyncStorage.removeItem("userName");
        setUserId("");
        setUserName(""); // Clearing name on logout
        setIsAdmin(false); // Clear isAdmin on logout
    }
    catch(error){
        console.log("Error during logout:", error.message);
    }
};
const checkLoggedInUser = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      const storedUsername = await AsyncStorage.getItem("userName");
      if (storedUserId && storedUsername) {
        setUserId(storedUserId);
        setUserName(storedUsername);
         // Set isAdmin based on user data (e.g., from server response)
         setIsAdmin(true); // Example: Set isAdmin to true if user is admin
      }
    } catch (error) {
      console.log("Error checking logged in user:", error.message);
    }
  };
    useEffect(() => {
        console.log('name in UserContext:', userName);
        // console.log('id in UserContext:', userId);
    }, [userName]);

    return (
        <UserType.Provider value={{ userId, setUserId, userName,setUserName, logout, checkLoggedInUser,isAdmin }}>
            {children}
        </UserType.Provider>
    )
}


export {UserType,UserContext}