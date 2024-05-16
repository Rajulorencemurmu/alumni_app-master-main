const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

const User = require("./models/users");
const Message = require("./models/message");
const Event = require("./models/events");
const Admin = require("./models/admins");
// =========================

const bcrypt = require("bcrypt");

mongoose
  .connect(
    "mongodb+srv://qq5474254:rajuismypassword@cluster0.yqsz3lk.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("err occured", err);
  });

const port = 8000;
app.listen(port, () => {
  console.log("Server is running on port 8000");
});

//User Routes
app.post("/register", async (req, res) => {
  const {
    name,
    email,
    password,
    number,
    image,
    occupation,
    batches,
    workingPlace,
  } = req.body; // Destructure occupation and workingPlace from req.body
  console.log("Request payload:", req.body);

  console.log("Image in backend=", image);

  console.log("after register and before try");

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("after try");

    // Create a new user object with occupation-specific fields
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      number,
      image,
      occupation,
      ...(occupation === "Alumni" && { workingPlace }), // Include workingPlace only if occupation is Alumni
      // ...(occupation === "Alumni" && { batch }), // Include batch for alumni
      // ...(occupation === "Student" && {batch}),// include batch for student as well
      batches, // Include batch for all occupations
      location: {
        type: "Point",
        coordinates: [
          req.body.location.coordinates[0],
          req.body.location.coordinates[1],
        ],
      },
    });

    console.log("after running newUser");
    // Save the user to the database
    const userData = await newUser.save();
    console.log("user data", userData);

    console.log("after saving it into db");
    res.status(201).send(userData);
    console.log("it has reached here");
  } catch (error) {
    if (error.code === 11000 && error.keyValue) {
      // Duplicate key error (E11000) handling
      const duplicateField = Object.keys(error.keyValue)[0];
      const duplicateValue = error.keyValue[duplicateField];
      return res.status(400).json({
        message: `Duplicate key error. ${duplicateField} '${duplicateValue}' already exists.`,
      });
    }
    console.log("error log");
    console.error("Error in registration:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
  console.log("I am here NOW");
});

//login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("email=", email);
  console.log("pass", password);

  try {
    // const admin = await Admin.findOne({ email });
    // console.log("Found your are admin=", admin);
    // if (admin) {
    //   const isPassValid = await bcrypt.compare(password, admin.password);
    //   if (!isPassValid) {
    //     return res
    //       .json(401)
    //       .json({ message: "Invalid email or password for admin" });
    //   }
    //   // Generate JWT token for admin
    //   const token = jwt.sign(
    //     { adminId: admin._id, email: admin.email },
    //     "your_secret_key",
    //     { expiresIn: "1h" }
    //   );
    //   return res.status(200).json({ message: "Admin login successful", token });
    // }
   
    // Check if the user exists
    const user = await User.findOne({ email });
    console.log("you found email", user);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Get the user's location from the database
    const location = await User.findOne(
      { username: user.username },
      { location: 1 }
    );

    // Update the user's location in the database
    await User.updateOne(
      { username: user.username },
      {
        $set: {
          location: {
            type: "Point",
            coordinates: [
              location.location.coordinates[0],
              location.location.coordinates[1],
            ],
          },
        },
      }
    );

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Log userName
    console.log("userName:", user.name);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name }, //including user name as well
      "your_secret_key",
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ message: "Login successful", token, name: user.name });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


//admin login logic
const generateToken = require("./auth");
app.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('you are inside try before finding email of admin')
    // Find the admin with the provided email
    let admin = await Admin.findOne({ email });
    // if (!admin) {
    //   console.log("No admin found, creating a new one...");

    //   // Create a new admin object with the provided email and password
    //   admin = new Admin({
    //     email: email,
    //     password: password,
    //   });

    //   // Save the new admin to the database
    //   await admin.save();

    //   console.log("New admin created successfully.");
    // }


    // If admin exists, check if the password matches
    if (admin.password === password) {
      // Passwords match, generate and return a token
      console.log('Password match of admin')
      const token = generateToken(admin._id, admin.email);
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Define the route to get all users
app.get("/admin/users", async (req, res) => {
  try {
    const admin=req.params.userId;
    console.log(admin)
    // Find all users
    const users = await User.find({});
    res.status(200).json(users);
    // console.log(users)
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




//endpoint to access all users currently logged in
app.get("/users/:userId", async (req, res) => {
  const loggedInUserId = req.params.userId;
  console.log("logged in user in index.js=", loggedInUserId);

  try {
    // Find users excluding the logged-in user and filter by occupation
    const users = await User.find({
      _id: { $ne: loggedInUserId },
      occupation: { $exists: true, $ne: null },
    });
    res.status(200).json(users);
  } catch (err) {
    console.log("Error retrieving users", err);
    res.status(500).json({ message: "Error retrieving users" });
  }
});

//endpoint to send a request to a user
app.post("/friendRequest", async (req, res) => {
  const { currentUserId, selectedUserId } = req.body;

  console.log("current user in index.js=", currentUserId);
  console.log("selected user in index.js=", selectedUserId);

  // Validate that both IDs are valid ObjectId strings
  if (!isValidObjectId(currentUserId) || !isValidObjectId(selectedUserId)) {
    return res.status(400).json({ error: "Invalid user IDs" });
  } else {
    console.log("valid");
  }

  try {
    // Updating the recipient's friend request array
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { friendRequests: currentUserId },
    });

    // Also updating the sender's sent friend request array
    await User.findByIdAndUpdate(currentUserId, {
      $push: { sentFriendRequests: selectedUserId },
    });

    res.sendStatus(200);
  } catch (error) {
    console.error("Error processing friend request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Function to check if a string is a valid ObjectId
function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

//endpoints to show friend request
app.get("/friendRequest/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Log the userId to verify it's received correctly
    console.log("Received userId:", userId);

    //fetching the user based on userId
    const user = await User.findById(userId)
      .populate("friendRequests", "name email image")
      .lean();
    // Log the user and friendRequests to verify
    console.log("User:", user);
    console.log("Friend Requests:", user.friendRequests);
    // const friendRequests=user.friendRequests;
    // res.json(friendRequests);
    res.json(user.friendRequests);
  } catch (error) {
    console.log("error occured");
    res.status(500).json({ message: "Internal server error " });
  }
});

//endpoint to accept friend-request
app.post("/friendRequest/accept", async (req, res) => {
  try {
    const { senderId, recipientId } = req.body;

    if (!senderId || !recipientId) {
      return res.status(400).json({
        message: "SenderId and RecipientId are required in the request body",
      });
    }

    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);

    if (!sender || !recipient) {
      return res.status(404).json({ message: "Sender or Recipient not found" });
    }

    sender.friends.push(recipientId);
    recipient.friends.push(senderId);

    // Filtering out recipient id after accepting friend request
    recipient.friendRequests = recipient.friendRequests.filter(
      (request) => request.toString() !== senderId.toString()
    );

    sender.sentFriendRequests = sender.sentFriendRequests.filter(
      (request) => request.toString() !== recipientId.toString()
    );

    await sender.save();
    await recipient.save();

    res.status(200).json({ message: "Friend request accepted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in friendRequest accept" });
  }
});

//endponts to access all  the friends of a user
app.get("/acceptedFriends/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate(
      "friends",
      "name email image"
    );
    const acceptedFriends = user.friends;
    res.json(acceptedFriends);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in getting Accepted Friends");
  }
});


///endpoint to get the userDetails to design the chat Room header
app.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    //fetch the user data from the user ID
    const recipientId = await User.findById(userId);

    res.json(recipientId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to update the user details
app.put("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;

    // Find the user by ID and update with the new data
    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true, runValidators: true });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



//sending messages
const path = require('path')
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files/"); // Set the destination path
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
});

const upload = multer({ storage: storage });

//endpoint to post Messages and store it in the backend
app.post("/messages", upload.single("imageFile"), async (req, res) => {
  try {
    const { senderId, recipientId, messageType, messageText } = req.body;

    //   // Check if the recipient is a valid user
    //   const recipient = await User.findById(recipientId);
    //   if (!recipient) {
    //     return res.status(400).json({ error: "Recipient user not found" });
    //   }

    //    // Check if the sender is friends with the recipient
    // const sender = await User.findById(senderId);
    // if (!sender.friends.includes(recipientId)) {
    //   return res.status(400).json({ error: "You are not friends with the recipient" });
    // }

    //  // Check if the sender is the intended sender
    //  if (senderId !== req.user.userId) {
    //   return res.status(400).json({ error: "You are not allowed to send messages on behalf of others" });
    // }

    const newMessage = new Message({
      senderId,
      recipientId,
      messageType,
      message: messageText,
      timestamp: new Date(),
      imageUrl: messageType === "image" ? req.file.filename : null,
      // imageUrl: req.file.originalname, // Use the original filename
    });

    await newMessage.save();

    console.log("checking", typeof senderId);
    console.log("checking2", typeof recipientId);

    //consoling the message you are sending
    console.log("The message you are sending", newMessage);

    res.status(200).json({ message: "Message sent Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



//endpoint to fetch the messages between two users in the chatRoom
app.get("/messages/:senderId/:recipientId", async (req, res) => {
  try {
    const { senderId, recipientId } = req.params;
    const senderObjectId = new mongoose.Types.ObjectId(senderId);
    const recipientObjectId = new mongoose.Types.ObjectId(recipientId);

    console.log("i am checking", typeof senderObjectId);
    console.log("i am checking2", typeof recipientObjectId);

    console.log("Messages Query Parameters:", {
      senderObjectId,
      recipientObjectId,
      query: {
        $or: [
          { senderId: senderObjectId },
          { recipientId: recipientObjectId },
          { senderId: recipientObjectId },
          { recipientId: senderObjectId },
        ],
      },
    });

    //correct one
    const messages = await Message.find({
      $or: [
        { senderId: senderObjectId, recipientId: recipientObjectId },
        { senderId: recipientObjectId, recipientId: senderObjectId },
      ],
    })
      .populate("senderId", "_id name")
      .populate("recipientId", "_id name");

    console.log("Fetched messages:", messages);

    res.json(messages);
  } catch (error) {
    console.log("Error fetching messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.get("/test", async (req, res) => {
//   try {
//     const message = await Message.findOne().populate("senderId", "_id name");
//     res.json(message);
//   } catch (error) {
//     console.log("Error fetching test message:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

//endpoint to delete the messages!
app.post("/deleteMessages", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: "invalid req body!" });
    }

    await Message.deleteMany({ _id: { $in: messages } });

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
});

app.get("/friend-requests/sent/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
      .populate("sentFriendRequests", "name email image")
      .lean();

    const sentFriendRequests = user.sentFriendRequests;

    res.json(sentFriendRequests);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal Server" });
  }
});

app.get("/friends/:userId", (req, res) => {
  try {
    const { userId } = req.params;

    User.findById(userId)
      .populate("friends")
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const friendIds = user.friends.map((friend) => friend._id);

        res.status(200).json(friendIds);
      });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "internal server error" });
  }
});

//location
// app.post("/api/location", async (req, res) => {
//   const { username, password, location } = req.body;

//   try {
//     const user = await User.findOne({ username, password });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.location = {
//       type: "Point",
//       coordinates: [location.longitude, location.latitude],
//     };

//     await user.save();
//     res.json({ message: "Location updated" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// app.post("/api/location", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username, password });
//     console.log('User in api location',user);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({
//       type: "Point",
//       coordinates: user.location.coordinates,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error from API_LOCATION" });
//   }
// });

//Handling locations
app.post("/api/location", async (req, res) => {
  const { currentUserId } = req.body;
  console.log("current user in Maps of index.js=", currentUserId);

  try {
    const user = await User.findById(currentUserId);
    console.log("User in api location=", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the locations of all registered users from the database
    const locations = await User.find({}, { location: 1 });

    // Convert the locations to the format required by the react-native-maps library
    const formattedLocations = locations.map((location) => ({
      type: "Point",
      coordinates: [
        location.location.coordinates[0],
        location.location.coordinates[1],
      ],
    }));

    // Add the user's location to the list of locations
    const userLocation = {
      type: "Point",
      coordinates: [
        user.location.coordinates[0],
        user.location.coordinates[1],
        user.location.coordinates[0] * 100,
        user.location.coordinates[1] * 100,
      ],
    };

    formattedLocations.push(userLocation); // Pushing logged-in user's location

    // Return the locations as the response body
    res.json(formattedLocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error from API_LOCATION" });
  }
});

//Handling Events
app.post("/api/events", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.log("Error saving Events", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the event." });
  }
});

app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "An error occurred while fetching events." });
  }
});

// app.get("/api/events", async (req, res) => {
//   try {
//     console.log('I am now fetching the details of api events');
//     const events = await Event.find();
//     res.json(events);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

//
const Razorpay = require("razorpay");
let razorpay = new Razorpay({
  key_id: "YOUR KEY ID", // your `KEY_ID`
  key_secret: "YOUR KEY SECRET", // your `KEY_SECRET`
});

app.post("/api/razorpay/order", async (req, res) => {
  try {
    const { amount } = req.body;
    console.log(typeof amount);
    console.log("got amount on server side", amount);

    const options = {
      amount: amount, // Razorpay expects amount in paisa
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        key1: "value1",
        key2: "value2",
      },
    };

    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id });
  } catch (err) {
    console.error("Razorpay error:", err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the order" });
  }
});
