
/**
 * CalendarsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
    
    async create(req, res, next) {
        let {showtime,movies,cinema,room} = req.body;
        if(!showtime || !movies || !cinema || !room){
            res.send(404);
            return
        }
        await Calendars.create({
            showtime:showtime,
            movies:movies,
            cinema:cinema,
            room:room
        })
        res.status(200).ok();
    },
    

};

