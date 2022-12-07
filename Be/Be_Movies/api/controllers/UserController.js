/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  
    async create(req, res){
        try{
            let userCollection = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone, 
                role: req.body.role || 'user',
            })
            res.status(200).json({
                message: 'ok',
            })
        }
        catch(err) {
            res.json({
                message: err.message
            })
        }
    },
    
   
};

