const prompt = require('prompt-sync')({ signint: true });
const imports = require('./book_rent_function');

var exit = false;

var user = new imports.User(prompt("Enter Name: "));
var bookrent = new imports.bookRent(user);

while (!exit) {

    bookrent.mainMenu();
    user_input = bookrent.user_input();

    if (user_input == 0) {
        exit = true;
    }

    // view books
    if (user_input == 1) {
        bookrent.view_func();
        view_book_input = bookrent.user_input();

        if (view_book_input == 0) {
            exit = true;
        } else { // view fantasy, romance, e.t.c
            x = bookrent.view_func().view_book(view_book_input);
            if (x == 0) {
                exit = true;
            }
        }
    }

    // borrow books
    if (user_input == 2) {
        bookrent.borrow_func();
        borrow_book_input = bookrent.user_input();

        if (borrow_book_input == 0) {
            exit = true;
        } else { // view books to borrow
            x = bookrent.borrow_func().borrow_book(borrow_book_input, user);
            if (x == 0) {
                exit = true;
            }
        }

    }

    // return book
    if (user_input == 3) {
        bookrent.return_func();
        return_book_input = bookrent.user_input();
        if (return_book_input == 0) {
            exit = true;
        } else {
            bookrent.return_func().return_book(return_book_input, user);
            exit = true;
        }
    }

    // donate book
    if (user_input == 4) {
        bookrent.donate_func();
        donate_book_input = bookrent.user_input();
        if (donate_book_input == 0) {
            exit = true;
        } else {
            bookrent.donate_func().donate_book(donate_book_input, user);
            exit = true;
        }
    }

    // view rented books
    if (user_input == 5) {
        bookrent.rented_func(user);
        exit = true;
    }

    exit = true;
}