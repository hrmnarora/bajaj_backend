const express = require("express");
const cors = require("cors");
const app = express();
const serverless = require("serverless-http"); // Required for Vercel

app.use(express.json());
app.use(cors());

// 🔹 GET Endpoint → Returns operation code
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// 🔹 POST Endpoint → Processes input and categorizes data
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    // Validation
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input. 'data' must be an array." });
    }

    const numbers = [];
    const alphabets = [];
    let highest_alphabet = "";

    // Process data
    data.forEach((item) => {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (typeof item === "string" && item.length === 1) {
        const upperChar = item.toUpperCase();
        alphabets.push(upperChar);

        if (!highest_alphabet || upperChar > highest_alphabet) {
          highest_alphabet = upperChar;
        }
      }
    });

    // Response JSON
    res.json({
      is_success: true,
      user_id: "Harman_Arora_29012004",
      email: "2236792.cse.cec.cgc.edu.in",
      roll_number: "2236792",
      numbers,
      alphabets,
      highest_alphabet: highest_alphabet ? [highest_alphabet] : [],
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: "Internal Server Error" });
  }
});

// Export the handler for Vercel
module.exports = serverless(app);
