/**
 * CinemasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    
    async create(req, res, next) {
        let {name,address,cinestar_id} = req.body;
        if(!name||!address||!cinestar_id){
            res.status(404).send('Error');
            return;
        }
        let cinema = {
            name: name,
            address: address,
            cinestar:cinestar_id
        }
        await Cinemas.create(cinema);
        res.status(200).ok();
    },
    async findOne(req, res){
        let {id} = req.params;

        let cinemasCollection = await Cinemas.findOne({id:id}).populate('room').populate('movie')
        res.json({
            cinemasCollection
        })
    }

};

