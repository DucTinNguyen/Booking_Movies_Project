/**
 * Module dependencies
 */

// ...


/**
 * room/getall.js
 *
 * Getall room.
 */
module.exports = async function getall(req, res) {

  let roomCollection = await Room.find();
  return res.json({
    roomCollection
  });

};
