const express = require("express");
const cors = require("cors");
const fs = require("fs");
const database = require("./data.json");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
    res.json(database);
});

app.post("/index", (req, res) => {
    const newHabit = req.body;
    console.log("Received new habit:", newHabit);

    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Error reading file");
        }

        let json;
        try {
            json = JSON.parse(data);
        } catch (parseErr) {
            console.error("Error parsing JSON:", parseErr);
            return res.status(500).send("Error parsing JSON");
        }

        if (!Array.isArray(json.Habits)) {
            console.error("Habits is not an array in JSON");
            return res.status(500).send("Invalid data format");
        }

        json.Habits.push(newHabit);

        fs.writeFile("data.json", JSON.stringify(json, null, 2), (err) => {
            if (err) {
                console.error("Error writing file:", err);
                return res.status(500).send("Error writing file");
            }
            res.status(201).send("Habit saved");
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});