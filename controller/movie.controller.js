const router = require("express").Router();
const { updateOne } = require("../models/movie.model");
const Movie = require("../models/movie.model")
const validateSession = require("../middleware/validate-session")
// "validateSession" = our middleware. Lil' Bouncer! 


router.post("/add", validateSession, async (req, res) => {
    //res.send("The pathway works!");

    try {
        // prepping the new movie object to be saved
        const movie = new Movie({
            movieTitle: req.body.movieTitle,
            movieDescription: req.body.movieDescription,
            movieYear: req.body.movieYear,
            isCurrentlyInTheaters: req.body.isCurrentlyInTheaters,
            rating: req.body.rating,
            owner_id: req.user._id
                // note: in above, we can reference ".user" because it's defined in the validateSession script, where we brought in the User model! 
        })
        // now we need to save the new object to the DB
        const newMovie = await movie.save();

        res.json({movie: newMovie, message: "Movie was saved"});
    } catch (error) {
        res.json({message: error.message})

    }
});

router.get("/", validateSession, async (req, res) =>{
    //res.send("Movie")
    console.log(req.test)
    try {
        const movie = await Movie.find()
        res.json({movie: movie, message: "Success."})
    } catch (err) {
        res.json({message: error.message})
    }
});




router.delete("/:id", validateSession, async (req, res) => {
    // res.send("The delete endpoint works!")

    try {
        const deletedMovie = await Movie.deleteOne({_id: req.params.id, owner_id: req.user._id});
        res.json({
            deletedMovie: deletedMovie, 
            message: deletedMovie.deletedCount > 0 ? "movie was deleted" : "movie was not removed"
        })
    } catch (error) {
        res.json({message: error.message})
    }
});




// router.patch("/update/:id", validateSession, async (req, res) => {
//     //res.send("The update endpoint works!");
//     try {

//         // First, finding the doc we want by req params 
//         const filter = {_id: req.params.id};

//         // Second, defining movie title in request that we want to update
//         const update = req.body;

//         //Then, 
//         const movie = await Movie.findOneAndUpdate(filter, update, {new: true})
        
//         res.json({
//             message: movie ? "Movie updated" : "movie was not updated", 
//             movie: movie})
        
//     } catch (error) {
//         res.json({message: error.message})
//     }
// })

router.patch("/update/:id", validateSession, async (req, res) => {
    try {
      const filter = { _id: req.params.id,  owner_id: req.user._id};
  
      const update = req.body;
      const returnOptions = { new: true };
  
      const movie = await Movie.findOneAndUpdate(filter, update, returnOptions);
  
      res.json({
        message: movie ? 'movie updated': "movie was not updated",
        movie: movie ? movie : {}
      })
    } catch (error) {
      res.json({ message: error.message });
    }
  });

// CHALLENGE! 
//? Create endpoint that will get record by it's ID,
//? Endpoint should be ("/:id"); Full URL is localhost:4000/movie/__id
//? Method = GET  


router.get("/:id", validateSession, async (req, res) => {
    try {
      const movie = await Movie.findById({ _id: req.params.id });
      res.status(200).json({
        movie: movie,
        message: "Success",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });





module.exports = router