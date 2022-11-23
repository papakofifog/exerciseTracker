//const exercises= require('../module/exercise')rs
const { getOneUserById }= require('./manageUsers')
const  { createLog, loggedUser, getExeciseLogCount }= require('./manageLogs')
const isEmpty = require('../utills/basicFunctions');
const exercise = require('../module/exercise');



// create exercies
const SaveExercise= async (req,res,next)=>{
    try{
        let givenDate= req.body.date;
       
        let requiredUser= await getOneUserById(req.params._id);
        //console.log(requiredUser)
        const userExerciseData= {
            username: requiredUser.username,
            description: req.body.description,
            duration: parseInt( req.body.duration),
            date: new Date(givenDate).toDateString(),
            _id:req.params._id,
        }
        // populate logs.
        const newLogs= {
            description: req.body.description,
            duration: parseInt( req.body.duration),
            date: new Date(givenDate).toDateString()
        }
        // get userlog if it exists or create one.
        let userLog= await loggedUser(userExerciseData);
        
        userLog.logs.push(newLogs);
        userLog.count= await getExeciseLogCount(userLog._id)+1
        await userLog.save();
        res.json(userLog)
        
        
    }catch(err){
        console.error(err)
        res.json(err)
    }
    
    
}

module.exports= SaveExercise;