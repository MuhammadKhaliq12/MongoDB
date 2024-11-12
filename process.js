const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const app = express();

mongoose.connect('mongodb://localhost:27017/library')
    .then(() => {
        console.log('MongoDB is Connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

const bookData = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, optional: true },
});

const Book = mongoose.model('Book', bookData);

app.use(express.json());

app.post('/book', async (req, res) => {
    try {
        const data = req.body;
        const newBook = await Book.create(data);
        res.status(201).send({ message: "Book Data added successfully", newBook });
    } catch (error) {
        res.status(400).send({ message: "Error adding book", error });
    }
});

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ message: "Books retrieved successfully", books });
    } catch (error) {
        res.status(500).send({ message: "Error retrieving books", error });
    }
});

app.get('/book/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).send({ message: "Book not found" });
        }
        res.json({ message: "Book found", book });
    } catch (error) {
        res.status(500).send({ message: "Error retrieving book", error });
    }
});

app.put('/book/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).send({ message: "Book not found" });
        }
        res.json({ message: "Book updated successfully", updatedBook });
    } catch (error) {
        res.status(400).send({ message: "Error updating book", error });
    }
});

app.delete('/book/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).send({ message: "Book not found" });
        }
        res.json({ message: "Book Deleted successfully", deletedBook });
    } catch (error) {
        res.status(500).send({ message: "Error deleting book", error });
    }
});

app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});