/**
 * Module dependencies
 */

// ...


/**
 * cinemas/get-one.js
 *
 * Get one.
 */
module.exports = async function getOne(req, res) {

  let{id} = req.params;
  let roomCollection = await Room.find({cinema:id})
  let moviesCollection = await Cinemas.find({id:id}).populate('movie')
  return res.json(
    {
      roomCollection,
      moviesCollection
    }
  );

};
