const fs = require('fs');
const path = require('path');

var lib = {
    baseDir: path.join(__dirname, '/../.data/')
};

const bookfilePath = lib.baseDir + 'books';

const bookReader = (bookfilePath, (err, mydata) => {
    fs.readdir(bookfilePath, (err, files) => {
        files.forEach(file => {
            filepath = bookfilePath + "\\" + file;
            fs.readFile(filepath, 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(JSON.parse(data).name)
                    return JSON.parse(data);
                }
            });
        })
    });
});
console.log(bookReader(bookfilePath));