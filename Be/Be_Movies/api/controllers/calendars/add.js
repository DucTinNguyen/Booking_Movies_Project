/**
 * Module dependencies
 */

// ...


/**
 * calendars/add.js
 *
 * Add calendars.
 */
module.exports = async function add(req, res) {


  let {id,roomid} = req.params;
  let calendar = await Calendars.findOne({id: id}).populate('movies').populate('cinema');
  let chairs = await Room.findOne({id: roomid}).populate('chair').populate('cinema')

  return res.status(200).json({
    calendar,
    chairs
  });

};
