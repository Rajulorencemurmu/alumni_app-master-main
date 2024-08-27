# My Alumni Network

My Alumni Network is a cross-platform mobile application designed for both Android and iOS, built using React Native and MongoDB. This app allows users to create profiles, connect with friends, view their locations, chat, manage events, play games, update profiles, search for jobs, and much more.

Whether you're a student, employee, or prospective student, you're welcome to contribute to this project! Follow the instructions below to get started.

## Features
- **Profile Creation:** Create and manage your personal profile.
- **Social Connections:** Add friends who are registered on the app and view their locations.
- **Communication:** Chat with friends and network within your alumni community.
- **Event Management:** Organize and participate in events.
- **Entertainment:** Play games and engage with the community.
- **Job Search:** Look for jobs and opportunities within the network.
- **Profile Updates:** Keep your information up-to-date.

## Requirements
- **Expo:** Ensure you have Expo installed on your device. The app is compatible with both Android and iOS.
- **Compatibility:** The app works on both the latest and older versions of Expo. If prompted to upgrade, you can still use the older version by downloading the previous Expo version.

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/my-alumni-network.git
```
Alternatively, you can download the ZIP file of the repository.

### 2. Install Dependencies
Navigate to the project folder and install the necessary dependencies:
```bash
npm install
```
You may also need to install additional packages:
```bash
npm install bcrypt axios
```

### 3. Backend Configuration
- **IP Configuration:** Obtain your IP address by running `ipconfig` in your command prompt. Update the `apiConfig.js` file with your IP address.
- **MongoDB Connection:** Create your own MongoDB cluster and update the connection string in `backend_api/index.js`:
  ```javascript
  const mongoURI = "your-mongodb-connection-string";
  ```

### 4. Run the Backend
Navigate to the `backend_api` directory and start the backend server:
```bash
node index.js
```
If there are issues, install any missing packages as prompted.

### 5. Run the Frontend
In a separate terminal, start the frontend:
```bash
npm start
```

### 6. Launch the App
Scan the QR code with your Expo app. If it doesn't work, try restarting the app or disconnecting and reconnecting your device.

## Preview
![Admin Login Page](assets/admin-login.jpg)


## Troubleshooting
If you encounter any issues during installation or have any questions, feel free to [raise an issue](https://github.com/rajulorencemurmu/my-alumni-network/issues) or connect with me on [LinkedIn](https://www.linkedin.com/in/raju-lorence-murmu).

---
