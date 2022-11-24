let newUserModel= require('../module/user')
const errorHandler= require('../Middlewares/handleErrors')
const isEmpty = require('../utills/basicFunctions')
// create a user



const createUser = async (req, res, next)=>{
    try{
        //console.log(req.body)
        let givenUser=req.body.username;
        const newUser= new newUserModel({
            username:givenUser
        });
        await newUser.save().then( (data)=>{
            res.json(newUser.introduce());
        }).catch( async(err)=>{
            //console.log(err.code)
            if (err.code===11000){
                let currentUser= await getOneUserByName(givenUser)
                
                return res.json(currentUser.introduce())
            }
            return res.json(err)
            
        })
    
    }
    catch(err){
        
        res.json(err);
    }
    
}

// get all users
const viewUsers= async (req, res)=>{
    
    try{
        let users= await newUserModel.find()
        if(isEmpty(users)){
            message={
                "message": "Users are not found"
            }
            return res.json(message)
        }
        return res.json(users)
    }
    catch(err){
        res.json(err)
    }
}


const getOneUserById= async (idGiven)=>{
    try{
        
        let user= await newUserModel.findById({_id:idGiven })
        if(UserExist(user)){
            return user;
        }
        return "User does not Exist";
    }catch(err){
        return err
    }
}

const getOneUserByName= async (username)=>{
    try{
        let user= await newUserModel.findOne({username: username})
        if(UserExist(user)){
            return user;
        }
        return "User does not exist"
    }catch(err){
        return err
    }
}

const UserExist= async (id_given)=>{
    try{
        let user= await getOneUser(id_given);
        if (user !== null){
            return true;
        }
        return false
    }catch(err){

    }
}



module.exports = { createUser, viewUsers, getOneUserById, getOneUserByName };


