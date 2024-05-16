import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          console.log('i am in adminusers')
          const response = await fetch(`${BASE_URL}/admin/users`);
          const data = await response.json();
          if (response.ok) {
            setUsers(data);
          } else {
            throw new Error("Could not get users");
          }
        } catch (error) {
          console.log("Error fetching users:", error);
        }
      };
      fetchUsers();
    }, []);
  
    return (
      <ScrollView>
        {users.map((user) => (
          <Users key={user._id} item={user} />
        ))}
      </ScrollView>
    );
  };

export default AdminUsers

const styles = StyleSheet.create({})