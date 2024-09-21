import express from "express";
const route = express.Router();

// session
route.post("session", (req, res) => {
  return res.send("Hello World");
});

// login
route.post("login", (req, res) => {
  return res.send("Hello World");
});

// register
route.post("register", (req, res) => {
  return res.send("Hello World");
});

// forgot-password
route.post("forgot-password", (req, res) => {
  return res.send("To be implemented");
});

// reset-password/token
route.post("reset-password", (req, res) => {
  return res.send("To be implemented");
});

export { route as authController };
