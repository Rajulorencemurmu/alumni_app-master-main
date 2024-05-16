// models/Event.js

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  location: String,
  description: String ,// Add description field
  price:String,
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
