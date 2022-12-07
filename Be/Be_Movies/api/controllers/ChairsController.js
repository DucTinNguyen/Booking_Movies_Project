/**
 * ChairsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  
    async create(req, res){
        
        let {status,price,type,name,room} = req.body;

        let chairCollection = await Chairs.create({
             status: status,
             price: price,
             type: type,
             name:name,
             room:room,
        })
        res.status(200).ok()
    },

    async find(req, res){
        
    }
};

