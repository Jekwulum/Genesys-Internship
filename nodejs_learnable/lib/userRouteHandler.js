const fileUtil = require('./fileUtil');
const routeHandler = {};
const fs = require('fs');
const path = require('path');

var lib = {
    baseDir: path.join(__dirname, '/../.data/')
};

const bookfilePath = lib.baseDir + 'books';

routeHandler.Users = (data, callback) => {
    const acceptableHeaders = ["post", "get"];
    if (acceptableHeaders.indexOf(data.method) > -1) {
        routeHandler._users[data.method](data, callback);
    } else {
        callback(405);
    }
};

routeHandler._users = {};

//Post route -- for creating a User
routeHandler._users.post = (data, callback) => {

    var id = typeof(data.payload.id) === 'string' && !isNaN(parseInt(data.payload.id)) ? data.payload.id : false;
    var name = typeof(data.payload.name) === 'string' && data.payload.name.trim().length > 0 ? data.payload.name : false;
    var address = typeof(data.payload.address) === 'string' && data.payload.address.trim().length > 0 ? data.payload.address : false;

    console.log(name, id, address)

    if (name && id && address) {
        const fileName = "user-" + id;
        fileUtil.create('users', fileName, data.payload, (err) => {
            if (!err) {
                callback(200, { message: "user added successfully", data: data.payload.data });
            } else {
                callback(400, { message: "couldn't add user" });
            }
        });
    } else if (data.query.return) {
        returnedBook = data.query.return.toLowerCase();
        callback(200, { message: 'book returned', data: returnedBook });
    } else {
        callback(400, { message: "some fields are incorrect" });
    }
};


//Get route -- for geting a user & for making a request to borrow book 
// The get user uses query whilst the request uses payload
routeHandler._users.get = (data, callback) => {
    if (data.query.id) {
        filename = 'user-' + data.query.id
        fileUtil.read('users', filename, (err, data) => {
            if (!err && data) {
                callback(200, { message: 'user retrieved', data: data });
            } else {
                callback(404, { err: err, data: data, message: 'could not retrieve user' });
            }
        });

    } else if (data.payload.bookName) {
        fileUtil.read('books', data.payload.bookName, (err, data) => {
            if (!err && data) {
                callback(200, { message: 'book retrieved', data: data });
            } else {
                callback(404, { err: err, data: data, message: 'could not retrieve book' });
            }
        });

    } else if (data.query.borrow) {
        bookName = data.query.borrow
        fs.readdir(bookfilePath, (err, files) => {
            files.forEach(file => {
                bookfilepath = bookfilePath + "\\" + file;
                fs.readFile(bookfilepath, 'utf-8', (err, data) => {
                    if (err) {
                        console.log(err);
                        callback(404, { err: err, data: data, message: 'could not retrieve book name' });
                    } else {
                        // console.log([JSON.parse(data).name]);
                        namelist = [JSON.parse(data).name];
                        for (let name of namelist) {
                            if (bookName.toLowerCase() == name.toLowerCase() && JSON.parse(data).available != 0) {
                                console.log("correct");
                                callback(200, { message: 'book retrieved', data: "book is available for borrowing" });
                            } else if (bookName.toLowerCase() != name.toLowerCase() && JSON.parse(data).available == 0) {
                                callback(404, { message: 'book not retrieved', data: "book is not available for borrowing" });
                            }
                            //  else {
                            //     callback(404, { message: 'book not retrieved', data: "book is not available for borrowing" });
                            // }

                        }

                    }
                });
            })
        });

    } else {
        callback(404, { message: 'user not found', data: null });
    }
};


module.exports = routeHandler;