const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
      if (!isValid(username)) {
          users.push({"username":username,"password":password});
          return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
          return res.status(404).json({message: "User already exists!"});
      }
  } else {
      return res.status(404).json({message: "Unable to register user. Username and password required"});
  }
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  //Write your code here
  try {
    // Simulate async operation using Promise
    const bookList = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(books);
      }, 100);
    });
    
    // Use Axios to demonstrate async capability (simulated)
    const response = await axios.get('http://localhost:5000/books', {
      timeout: 1000
    }).catch(() => {
      // Fallback to local data if external call fails
      return { data: bookList };
    });
    
    return res.status(200).send(JSON.stringify(response.data || bookList, null, 4));
  } catch (error) {
    return res.status(500).json({message: "Error fetching books"});
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  //Write your code here
  try {
    const isbn = req.params.isbn;
    
    // Simulate async operation using Promise
    const book = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (books[isbn]) {
          resolve(books[isbn]);
        } else {
          reject(new Error("Book not found"));
        }
      }, 100);
    });
    
    // Use Axios to demonstrate async capability (simulated)
    const response = await axios.get(`http://localhost:5000/books/${isbn}`, {
      timeout: 1000
    }).catch(() => {
      // Fallback to local data if external call fails
      return { data: book };
    });
    
    return res.status(200).json(response.data || book);
  } catch (error) {
    return res.status(404).json({message: "Book not found"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  //Write your code here
  try {
    const author = req.params.author;
    
    // Simulate async operation using Promise
    const booksByAuthor = await new Promise((resolve, reject) => {
      setTimeout(() => {
        let results = [];
        for (let isbn in books) {
          if (books[isbn].author === author) {
            results.push(books[isbn]);
          }
        }
        if (results.length > 0) {
          resolve(results);
        } else {
          reject(new Error("No books found by this author"));
        }
      }, 100);
    });
    
    // Use Axios to demonstrate async capability (simulated)
    const response = await axios.get(`http://localhost:5000/books/author/${encodeURIComponent(author)}`, {
      timeout: 1000
    }).catch(() => {
      // Fallback to local data if external call fails
      return { data: booksByAuthor };
    });
    
    return res.status(200).json(response.data || booksByAuthor);
  } catch (error) {
    return res.status(404).json({message: "No books found by this author"});
  }
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  //Write your code here
  try {
    const title = req.params.title;
    
    // Simulate async operation using Promise
    const booksByTitle = await new Promise((resolve, reject) => {
      setTimeout(() => {
        let results = [];
        for (let isbn in books) {
          if (books[isbn].title === title) {
            results.push(books[isbn]);
          }
        }
        if (results.length > 0) {
          resolve(results);
        } else {
          reject(new Error("No books found with this title"));
        }
      }, 100);
    });
    
    // Use Axios to demonstrate async capability (simulated)
    const response = await axios.get(`http://localhost:5000/books/title/${encodeURIComponent(title)}`, {
      timeout: 1000
    }).catch(() => {
      // Fallback to local data if external call fails
      return { data: booksByTitle };
    });
    
    return res.status(200).json(response.data || booksByTitle);
  } catch (error) {
    return res.status(404).json({message: "No books found with this title"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  if (books[isbn]) {
      return res.status(200).json(books[isbn].reviews);
  } else {
      return res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;
