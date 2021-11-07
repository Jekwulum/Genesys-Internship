const express = require('express')
const fileUtil = require("./lib/fileUtil")
const helper = require("./lib/helper")
const fs = require('fs')
const path = require('path');
const { baseDir } = require('./lib/fileUtil');

var lib = {
    baseDir: path.join(__dirname, '/./.data/')
};

const bookfilePath = lib.baseDir + 'books';

const app = express()
const port = 3000

let count = 0

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/ping', (req, res) => {
    count++
    res.send(`There has been ${count} request since the server started`)
})


// get requests
app.get('/books/:book_id', (req, res) => {
    const book_id = req.params.book_id

    if (book_id) {
        fileUtil.read('books', book_id, (err, data) => {
            if (!err && data) {
                res.status(200).send({ message: 'Book retrieved', data: data })
            } else {
                res.status(404).send({ err: err, data: data, message: 'Could not retrieve book' })
            }
        });
    } else {
        res.status(400).send({ message: 'Book id is required', data: null })
    }
})

app.get('/users/:id', function(req, res) {
    user_id = req.params.id
    if (user_id) {
        filename = 'user-' + user_id
        fileUtil.read('users', filename, (err, data) => {
            if (!err && data) {
                res.status(200).send({ message: "user retrieved successfully", data: data });
            } else {
                res.status(400).send({ err: err, data: data, message: 'could not retrieve user' });
            }
        });
    } else {
        res.status(404).send({ message: "incorrect!" })
    }

})



app.post("/books", (req, res) => {
    const data = req.body

    //validate that all required fields are filled out
    var name = typeof(data.name) === 'string' && data.name.trim().length > 0 ? data.name : false;
    var price = typeof(data.price) === 'string' && !isNaN(parseInt(data.price)) ? data.price : false;
    var author = typeof(data.author) === 'string' && data.author.trim().length > 0 ? data.author : false;
    var publisher = typeof(data.publisher) === 'string' && data.publisher.trim().length > 0 ? data.publisher : false;

    // add availability feature
    data.available = 3;
    if (name && price && author && publisher) {
        const fileName = helper.generateRandomString(30);
        fileUtil.create('books', fileName, data, (err) => {
            if (!err) {
                res.status(200).send({ message: "book added successfully", data: data })
            } else {
                res.status(400).send({ message: "couldn't add book" })
            }
        });
    } else {
        res.status(400).send({ message: "Some fiedls are incorrect" })
    }
})

app.post('/users/', (req, res) => {
    // creating a user
    var id = typeof(req.body.id) === 'string' && !isNaN(parseInt(req.body.id)) ? req.body.id : false;
    var name = typeof(req.body.name) === 'string' && req.body.name.trim().length > 0 ? req.body.name : false;
    var address = typeof(req.body.address) === 'string' && req.body.address.trim().length > 0 ? req.body.address : false;

    console.log(name, id, address)
    if (name && id && address) {
        const fileName = "user-" + id;
        fileUtil.create('users', fileName, req.body, (err) => {
            if (!err) {
                res.status(200).send({ message: "user added successfully", data: req.body })
            } else {
                res.status(400).send({ message: "couldn't add user" })
            }
        });
    } else {
        res.status(400).send({ message: "some fields are incorrect", data: null })
    }
});



app.put("/books/:book_id", (req, res) => {
    const data = req.body
    const book_id = req.params.book_id

    if (book_id) {
        fileUtil.update('books', book_id, data, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Book updated successfully' })
            } else {
                res.status(404).send({ err: err, data: null, message: 'Could not update book' })
            }
        });
    } else {
        res.status(404).send({ message: 'Book not found' })
    }
})

app.put('/borrow/', (req, res) => {
    const book_id = req.body.book_id

    if (book_id) {
        completeBookFilePath = bookfilePath + "\\" + book_id + ".json"
        fileUtil.read('books', book_id, (err, data) => {
            if (!err && data) {
                if (data.available > 0) {
                    // decrease availability by one
                    data.available -= 1;
                    fs.writeFile(completeBookFilePath, JSON.stringify(data), (err) => {
                        if (err) return console.log(err);
                    })

                    res.status(200).send({ message: 'Book retrieved', data: data })

                } else {
                    res.status(400).send({ message: 'Book not available' })
                }

            } else {
                res.status(404).send({ err: err, data: data, message: 'Could not retrieve book' })
            }
        });
    } else {
        res.status(400).send({ message: 'Book id is required', data: null })
    }
})

app.put('/return/', (req, res) => {
    const book_id = req.body.book_id

    if (book_id) {
        completeBookFilePath = bookfilePath + "\\" + book_id + ".json"
        fileUtil.read('books', book_id, (err, data) => {
            if (!err && data) {
                if (data) {
                    // increase availability by one
                    data.available += 1;
                    fs.writeFile(completeBookFilePath, JSON.stringify(data), (err) => {
                        if (err) return console.log(err);
                    })

                    res.status(200).send({ message: 'Book Returned', data: data })

                } else {
                    res.status(400).send({ message: 'Book not found' })
                }

            } else {
                res.status(404).send({ err: err, data: data, message: 'Could not retrieve book' })
            }
        });
    } else {
        res.status(400).send({ message: 'Book id is required', data: null })
    }
})



app.delete("/books/:book_id", (req, res) => {
    const book_id = req.params.book_id

    if (book_id) {
        fileUtil.delete('books', book_id, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Book deleted successfully' })
            } else {
                res.status(400).send({ err: err, message: 'Could not delete book' })
            }
        })
    } else {
        res.status(404).send({ message: 'Book not found' })
    }
})

app.use('**', (req, res) => {
    res.status(404).send("Route not found")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});