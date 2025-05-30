const express = require("express");
const cors = require("cors");
const fs = require("fs");
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

app.post('/login', (req,res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const json = fs.readFileSync("data.json");
        const users = JSON.parse(json);
        const user = users.LoginData.find(u => u.email === email);
        if(user && password === user.password) {
            res.json({ token: 'dummy-token' });
        } else {
            res.status(401).json({message: 'Invalid credentials'});
        }
    } catch (err) {
        console.error('Failed to read data.json',err);
        res.status(500).json({ message: 'Internal server error' })
    }
    
})

app.post('/update', (req, res) => {
    const updates = req.body.updates;

    if(!Array.isArray(updates)){
        return res.status(400).json({ message: "Invalid update format" });
    }

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

        for(const { type, value } of updates) {
            switch(type) {
                case "Xp":
                    json.Xp = json.Xp + value;
                    break;
                case "Habit":
                    json.Habits = json.Habits || [];
                    json.Habits.push({name: value});
                    break;
                case "Checkbox":
                    json.Checkboxes = json.Checkboxes || [];
                    json.Checkboxes.push(value);
                    break;
                case "CheckboxUpdate":
                    console.log(value);
                    json.Checkboxes = json.Checkboxes || [];
                    console.log(json.Checkboxes)
                    json.Checkboxes = value;
                case "Streak":
                    if(typeof value != "number") break;
                    json.Streak = value;
                    break;
                default:
                    return res.status(400).json({message: "Invalid update type"})
            }
            if(json.Xp >= 100){
                json.Level = json.Level + 1;
                json.Xp = json.Xp % 100;
            }
        }

        fs.writeFile("data.json", JSON.stringify(json, null, 2), (err) => {
            if(err) {
                console.error("Error writing file: ",err);
                return res.status(500).send("Error writing file");
            }
            res.status(200).json({ message: `${updates.type} updated` });
        })
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});