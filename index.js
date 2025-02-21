const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json()); // Enable JSON request body parsing
app.use(cors()); // Enable CORS for frontend communication

// 🔹 GET Endpoint → Returns operation code
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// 🔹 POST Endpoint → Processes input and categorizes data
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    
    // Validation: Ensure "data" exists and is an array
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input. 'data' must be an array." });
    }

    const numbers = [];
    const alphabets = [];
    let highest_alphabet = "";

    // Process data
    data.forEach(item => {
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
      user_id: "Harman_Arora_29012004",  // Replace with your actual name and DOB
      email: "2236792.cse.cec.cgc.edu.in",  // Replace with your email
      roll_number: "2236792",  // Replace with your college roll number
      numbers,
      alphabets,
      highest_alphabet: highest_alphabet ? [highest_alphabet] : []
    });

  } catch (error) {
    res.status(500).json({ is_success: false, message: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
