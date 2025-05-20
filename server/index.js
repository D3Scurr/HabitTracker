const express = require("express");
const cors = require("cors");
const fs = require("fs");
const database = require("./data.json");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading data");
        }
        res.json(JSON.parse(data));
    });
});

app.post('/update', (req, res) => {
    const { type, value } = req.body;

    fs.readFile("data.json", "utf8", (err,data) => {
        if(err) {
            console.error("Error reading file: ",err);
            return res.status(500).send("Error reading file");
        }

        let json;
        try {
            json = JSON.parse(data);
        } catch (parseErr) {
            console.error("Error parsing JSON: ",parseErr);
            return res.status(500).send("Error parsing JSON");
        }

        switch(type) {
            case "Xp":
                json.Xp = value;
                break;
            case "Habit":
                json.Habits = json.Habits || [];
                json.Habits.push({name: value});
                break;
            case "Streak":
                json.Streak = value;
                break;
            default:
                return res.status(400).json({message: "Invalid update type"})
        }

        fs.writeFile("data.json", JSON.stringify(json, null, 2), (err) => {
            if(err) {
                console.error("Error writing file: ",err);
                return res.status(500).send("Error writing file");
            }
            res.status(200).json({ message: `${type} updated` });
        })
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});