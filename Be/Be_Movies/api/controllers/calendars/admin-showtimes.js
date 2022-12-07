/**
 * Module dependencies
 */

// ...


/**
 * calendars/admin-showtimes.js
 *
 * Admin showtimes.
 */
module.exports = async function adminShowtimes(req, res) {

  let {showtime,movies,cinema,room} = req.body;
        await Calendars.create({
            showtime:showtime,
            movies:movies,
            cinema:cinema,
            room:room
        })
        res.status(200).ok();
};
