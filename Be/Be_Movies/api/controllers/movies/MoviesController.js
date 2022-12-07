/**
 * MoviesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {
    
    async create(req, res){
        let movie={
            name:req.body.name,
            description:req.body.description,
            image:req.body.image,
            rate:req.body.rate,
            year:req.body.year,
            genre:req.body.genre,
            time:req.body.time,
            trailer:req.body.trailer
        }
        let movieCollection = await Movies.create(movie)
        res.ok({
            movie:movieCollection,
        })
    },
};

