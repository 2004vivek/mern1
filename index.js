const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

mongoose.connect("mongodb+srv://vks7633a:42QMW3lvS9Tev70f@cluster0.otls6.mongodb.net/studentdb")
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.log(err));

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  marks: Number
});

const Student = mongoose.model("Student", StudentSchema);

// API to get students sorted and paginated
app.get("/api/students", async (req, res) => {
  const page = parseInt(req.session.page || req.query.page || 1);
  const limit = 3; // 3 records per page
  const skip = (page - 1) * limit;

  const students = await Student.find().sort({ name: 1 }).skip(skip).limit(limit);
  req.session.page = page;
  res.json(students);
});

app.listen(3000, () => console.log("Server running on port 3000"));
