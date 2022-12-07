/**
 * SessionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    
    new: async function(req, res, next) {

      try{
        let {email,password} = req.body;
        // authentication
        let obj = await User.findOne({email: email}).decrypt();
        if(obj) {
            if(obj.password === password) {
                req.session.userId = obj.id
                req.session.authenticated = true
                req.session.cookie.maxAge = 30*30*1000
                //user back to return
                let user = {
                    id:obj.id,
                    name:obj.name,
                    email:obj.email,
                    phone:obj.phone,
                    role:obj.role,
                    session:req.session.userId,
                }
                return res.json({
                    user
                })
            }
            else{
                res.json({message:'Incorrect password. Type again'})
            }
        }
        else{
            res.json({message:'Invalid email'})
        }
      

        //succesfully authenticated
      }
      catch(err){ return err.message; }
        
    }   

};

