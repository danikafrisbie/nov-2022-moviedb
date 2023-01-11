const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    movieTitle: String,
    movieDescription: String,
    movieYear: Number,
    isCurrentlyInTheaters: Boolean,
    rating: Number,
    owner_id: String,
    // owner_id: {see Rob's video on how to link tables}
})


module.exports = mongoose.model("Movie", movieSchema);