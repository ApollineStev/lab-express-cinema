const router = require('express').Router();
const Movie = require('../models/Movie.model')

 
// GET route to retrieve and display all the books
//router.get('/movies', (req, res, next) => { res.render('../views/movies-list.hbs')});
 
router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((movieList) => {
      // -> allTheBooksFromDB is a placeholder, it can be any word
      console.log("Retrieved books from DB:", movieList);

      // we call the render method after we obtain the books data from the database -> allTheBooksFromDB
      res.render('../views/movies-list.hbs', { movies: movieList }); // pass `allTheBooksFromDB` to the view (as a variable books to be used in the HBS)
    })
    .catch((error) => {
      console.log("Error while getting the books from the DB: ", error);

      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

router.get("/movies/:id" , (req, res) => {
  const { movieId } = req.params
  
  Movie.findById().then((theMovie) => {
    res.render('movie-details', {movie: theMovie})
  })
  
})


module.exports = router;