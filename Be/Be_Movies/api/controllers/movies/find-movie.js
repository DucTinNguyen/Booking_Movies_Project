/**
 * Module dependencies
 */

// ...


/**
 * movies/find-movie.js
 *
 * Find movie.
 */
module.exports = async function findMovie(req, res) {

  try {
    let { name } = req.allParams();
    
    let movieObj = await Movies.findOne({ name: name })
    // console.log(movieObj)
    if (movieObj) {
      console.log(movieObj)
      return res.status(200).json({
        movieObj
      })
    }
    else {
      return res.status(200).json({
        message: 'Not found'
      }
      )
    }
  }
  catch (err) {
    console.log(err)
  }

};
