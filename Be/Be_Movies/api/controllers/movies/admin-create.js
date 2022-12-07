/**
 * Module dependencies
 */

// ...


/**
 * movies/admin-create.js
 *
 * Admin create.
 */
module.exports = async function adminCreate(req, res){

  let {name,cinestar,cinemas} = req.body;
  let check = await Movies.findOne({name: name});
//   console.log(req.body)
//   console.log(check)
  if(check){
    //add cinestar
    await Movies.addToCollection(check.id,'cinestar',cinestar)
    await Movies.addToCollection(check.id,'cinemas',cinemas)
    res.ok()
  }
  else{
    req.file('image').upload({
        // don't allow the total upload size to exceed ~10MB
        dirname: '../../assets/images/movies',
        maxBytes: 10000000
    }, async function (err, uploadedFile) {
        if (err) {
            return res.serverError(err); 
        }
  
        // If no files were uploaded, respond with an error.
        if (uploadedFile.length === 0){
            return res.serverError("No files were uploaded!"); 
        }
  
        // Use this log all the uploaded file info
        // console.log(uploadedFile[0]);
  
        // Get the name of the file
        let fileName = uploadedFile[0].filename;
        // Get the file descriptor and remove the directory details
        let fileUID = uploadedFile[0].fd.replace(/^.*[\\\/]/, '');
        // Create a MoviesItem to insert into database
        let movie={
          name:name,
          description:req.body.description,
          rate:req.body.rate,
          year:req.body.year,
          genre:req.body.genre,
          time:req.body.time,
          trailer:req.body.trailer,
          cinestar:cinestar,
          cinemas:cinemas,
          image:`/images/movies/${fileUID}`,
      }
      await Movies.create(movie)
      res.ok()
      })
  }

};
