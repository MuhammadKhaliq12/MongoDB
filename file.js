const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

app.post('/createBook', (req, res) => {
    const data = req.body;
    fs.writeFile('fileSystem.txt', JSON.stringify(data), (error) => {
        if (error) {
            console.error("Error in writing File", error);
            res.status(500).send("Error in Creating File");
        } else {
            console.log("File Created");
            res.status(201).send("File Created");
        }
    });
});

app.get('/readFile', (req, res) => {
    fs.readFile('fileSystem.txt', 'utf8', (error, data) => {
        if (error) {
            console.log("Error in Reading File", error);
            res.status(500).send("Error in Reading File");
        } else {
            res.status(200).json({ message: "File Read Successfully", data: JSON.parse(data) });
        }
    });
});

app.put('/updateFile', (req, res) => {
    const newData = req.body;
    fs.writeFile('fileSystem.txt', JSON.stringify(newData), (error) => {
        if (error) {
            console.error("Error in updating File", error);
            res.status(500).send("Error in Updating File");
        } else {
            console.log("File Updated");
            res.status(200).send("File Updated");
        }
    });
});

app.delete('/deleteFile', (req, res) => {
    fs.unlink('fileSystem.txt', (error) => {
        if (error) {
            console.error("Error in deleting File", error);
            res.status(500).send("Error in Deleting File");
        } else {
            console.log("File Deleted");
            res.status(200).send("File Deleted");
        }
    });
});

app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});