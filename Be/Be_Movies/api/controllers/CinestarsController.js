/**
 * CinestarsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    async create(req, res){
        let {name,logo} = req.body;
        let cinestarObj = {
            name: name,
            logo:logo
        }
        if(!name || !logo){
            res.status(404).json({
                message:'Can not create!'
            })
        }
        Cinestars.create(cinestarObj);
        res.status(200).ok();
    },
    async findOne(req, res){
        let {id} = req.params;
        let cinestarCollection = await Cinestars.find({id:id}).populate('cinema')
        res.json({
            cinestarCollection
        })
    }   
};

