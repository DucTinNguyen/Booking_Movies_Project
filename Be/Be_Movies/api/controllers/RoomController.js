/**
 * RoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    async create(req, res){
        let {name_room,cinema_id} = req.body
        if(!name_room || !cinema_id){
            res.status(404).send({message:'Invalid'})
            return 
        }
        let roomsObj = await Room.create({
            name_room:name_room,
            cinema:cinema_id
        })
        res.ok()
    },

    async find(req, res){
        let chairsCollection = await Room.find().populate('chair')
        res.json({
            chairsCollection
        })
    },

    async findOne(req, res){
        let chairsCollection = await Room.findOne({id:req.params.id}).populate('chair')
        res.json({
            chairsCollection
        })
    }

};

