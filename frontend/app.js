const express = require("express");
const path = require("path");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

// Show form
app.get("/", (req, res) => {
  res.render("index");
});

// Submit form -> send data to Flask backend
app.post("/submit", async (req, res) => {
  const { name, email } = req.body;
  try {
    const response = await fetch("http://backend:5000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    const result = await response.json();
    res.send(`<h1>Submitted!</h1><p>${JSON.stringify(result)}</p><a href="/">Back</a>`);
  } catch (err) {
    res.send("❌ Error: " + err.message);
  }
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Frontend running on port ${PORT}`));
