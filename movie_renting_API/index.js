const prompt = require('prompt-sync')({ signint: true });

movie_arr = [];
movie_titles_arr = [];
class Movie {
    constructor(title, year, director, genre) {
        this.title = title;
        this.year = year;
        this.director = director;
        this.genre = genre;

    }
}


function output(movie_title, movie_arr) {
    movie_title = movie_title.toLowerCase();
    for (let movie of movie_arr) {
        if (movie_title == movie.title.toLowerCase()) {
            return ("Movie Title: " + movie.title + " \n" + "Year Released: " + movie.year + "\n" + "Director: " + movie.director + "\n" + "Genre: " + movie.genre);
        }

    }
}


const aquaman = new Movie("Aqua Man", "2018", "James Wan", "action-fantasy");
const avengers_endgame = new Movie("Avengers: Endgame", "2019", "Joe Russo", "action-sci-fi");
const jumanji = new Movie("Jumanji", "2019", "Jake Kasdan", "fantasy");
movie_arr.push(aquaman);
movie_arr.push(avengers_endgame);
movie_arr.push(jumanji);
// console.log(movie_arr);

for (let movie of movie_arr) {
    movie_titles_arr.push(movie.title);
}

console.log("The movies we have are: " + movie_titles_arr);
movie_title = prompt('Enter movie title to rent: ');
console.log(output(movie_title, movie_arr));