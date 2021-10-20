const prompt = require('prompt-sync')({ signint: true });

class User {
    constructor(username) {
        this.username = username;
        this.books_borrowed = [];
        this.donated = [];
    }

    borrow = function(book, category) {
        this.books_borrowed.push(book); //add to books borrowed
        let index = category.indexOf(book);
        if (index != -1) {
            category.splice(index, 1); // remove from the books we have
        }
    }

    donate = function(book, category) {
        category.push(book);
        this.donated.push(book);
    }

    return_book = function(book, category) {
        category.push(book)
        let index = this.books_borrowed.indexOf(book);
        if (index != -1) {
            books_borrowed.splice(index, 1); // remove from the books borrowed
        }
    }
}

fantasy = ['The Name of the Wind', 'A game of thrones', ' The fifth season', 'The Lord of the Rings'];
scifi = ['The Martian', 'Brave New World', "Ender's Game", 'The Time Machine'];
romance = ['It ends with us', 'Beach Read', 'The Duke and I', 'Jane Eyre', 'The Kiss Quotient', 'One last stop'];

var bookRent = function(user) {

    console.log('\n', "Hello " + user.username);

    return {

        mainMenu: function() {
            console.log('\n', "MAIN MENU: ",
                '\n', "1. View Books",
                '\n', "2. Borrow Book",
                '\n', "3. Return Book",
                '\n', "4. Donate",
                '\n', "5. View Rented Books",
                '\n', "0. Exit"
            )
        },

        view_func: function() {
            console.log('\n', "VIEW BOOKS: ",
                '\n', "1. Fantasy Books",
                '\n', "2. Sci-Fi Books",
                '\n', "3. Romance Books",
                '\n', "0. Exit",
            );

            return {
                view_book: function(n) {
                    if (n == 1) {
                        console.log("\n fantasy books: ")
                        for (let book of fantasy) {
                            console.log(book);
                        }
                        console.log("0. Exit");

                        return prompt("> ");
                    } else if (n == 2) {
                        console.log("\n Sci-Fi books: ")
                        for (let book of scifi) {
                            console.log(book);
                        }
                        console.log("0. Exit");

                        return prompt("> ");
                    } else if (n == 3) {
                        console.log("\n Romance books: ")
                        for (let book of scifi) {
                            console.log(book);
                        }
                        console.log("0. Exit");

                        return prompt("> ");
                    }
                }

            }
        },

        borrow_func: function() {
            console.log('\n', "BORROW BOOK: ",
                '\n', "1. Fantasy Books",
                '\n', "2. Sci-Fi Books",
                '\n', "3. Romance Books",
                '\n', "0. Exit",
            );

            return {
                borrow_book: function(n, user) {
                    if (n == 1) {
                        console.log("\n fantasy books: ")
                        for (let book of fantasy) {
                            console.log(book);
                        }

                        console.log("0. Exit");
                        book_name = prompt("Enter Book Name, enter 0 to end: ");
                        while (book_name != 0) {
                            user.borrow(book_name, fantasy);
                            console.log("Books Borrowed: ", user.books_borrowed);
                            book_name = prompt("Enter Book Name, enter 0 to end: ");
                        }
                        return prompt("> ");

                    } else if (n == 2) {
                        console.log("\n Sci-Fi books: ")
                        for (let book of scifi) {
                            console.log(book);
                        }

                        console.log("0. Exit");
                        book_name = prompt("Enter Book Name, enter 0 to end: ");
                        while (book_name != 0) {
                            user.borrow(book_name, scifi);
                            console.log("Books Borrowed: ", user.books_borrowed);
                            book_name = prompt("Enter Book Name, enter 0 to end: ");
                        }
                        return prompt("> ");

                    } else if (n == 3) {
                        console.log("\n Romance books: ")
                        for (let book of romance) {
                            console.log(book);
                        }

                        book_name = prompt("Enter Book Name, enter 0 to end: ");
                        while (book_name != 0) {
                            user.borrow(book_name, romance);
                            console.log("Books Borrowed: ", user.books_borrowed);
                            book_name = prompt("Enter Book Name, enter 0 to end: ");
                        }
                        return prompt("> ");
                    }
                },
            }
        },

        return_func: function() {
            console.log('\n', "RETURN BOOK: ",
                '\n', "1. Fantasy Books",
                '\n', "2. Sci-Fi Books",
                '\n', "3. Romance Books",
            );
            return {
                return_book: function(n, user) {
                    if (n == 1) {
                        book_name = prompt("Enter Book Name: ");
                        user.return_book(book_name, fantasy);

                    } else if (n == 2) {
                        book_name = prompt("Enter Book Name: ");
                        user.return_book(book_name, scifi);

                    } else if (n == 3) {
                        book_name = prompt("Enter Book Name: ");
                        user.return_book(book_name, romance);

                    }
                    console.log("book returned");
                    return exit = true;
                }

            }
        },

        donate_func: function() {
            console.log('\n', "You can donate to any of these categories: ",
                '\n', "1. Fantasy Books",
                '\n', "2. Sci-Fi Books",
                '\n', "3. Romance Books",
            );
            return {
                donate_book: function(n, user) {
                    if (n == 1) {
                        book_name = prompt("Enter Book Name: ");
                        user.donate(book_name, fantasy);

                    } else if (n == 2) {
                        book_name = prompt("Enter Book Name: ");
                        user.donate(book_name, scifi);

                    } else if (n == 3) {
                        book_name = prompt("Enter Book Name: ");
                        user.donate(book_name, romance);

                    }
                    console.log("book donated: ", book_name);
                    return exit = true;
                }

            }
        },

        rented_func: function(user) {
            console.log("books borrowed: ", user.books_borrowed);
        },

        user_input: function() {
            return prompt("> ");
        }
    }
}

module.exports = { User, bookRent, fantasy, scifi, romance }