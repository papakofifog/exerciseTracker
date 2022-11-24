const log = require('../module/logs')



// create user log
const createLog= async (data)=>{
    try{
        let newLog= new log({
            username: data.username,
            count: 0,
            _id: data._id
        })
        await newLog.save().then((dataResponse)=>{
            return newLog;
        }).catch((err)=>{
            console.error(err)
        }) 
    }catch(err){
        console.error(err)
    }
}

// get a user log
const loggedUser= async (data) =>{
    try{
        
        let uselog= await log.findById({_id: data._id})
        
        if( await isUserLogged(uselog)){
            return uselog;
        }
        else{
            let newlog= await createLog(data);
            let newUseLog= await log.findById({_id: data._id})
            return newUseLog;
            
            //return newlog;
        }
    }catch(err){
        console.error(err)
    }
}

const updateUserLogs= async (newExerciseLog,data)=>{
    data.logs.push(newExerciseLog);
    data.count= await getExeciseLogCount(data._id)+1
    await data.save();
}



let getExeciseLogCount= async (user_id)=>{
    let numberExerciseLogs= await log.findById({_id: user_id });
    return numberExerciseLogs.logs.length;
}

const normalOrRangeUserLogs= async (req, res, next) =>{
    
    if (req.query.hasOwnProperty('from') && req.query.hasOwnProperty('to') && req.query.hasOwnProperty('limit')){
        return viewAlluserLogsPerDateRange(req,res,next)
    }else{
        return viewUserLogs(req,res,next)
    }
}



const viewUserLogs= async (req, res, next)=>{
    try{
        let alluserLogs= await log.findById({_id: req.params.id });
        //console.log(isUserLogged(alluserLogs))
        if( isUserLogged(alluserLogs)){
            
            return res.json(alluserLogs);
        }
        //console.log(" Object is null")
        return res.json("User does not have any logs")
    }catch(err){
        console.error(err)
        next(err)
    }
    
}

// check the user log
let isUserLogged=(data)=>{
    //console.log(data)    
    if (data === null){
        return false;
    }
    return true;
}



const viewAlluserLogsPerDateRange= async (req, res, next)=>{
    try{
        let userId= req.params.id;
        let startDate= req.query.from;
        let endDate= req.query.to;
        let limit= req.query.limit;
        let userLoger= await log.findById({_id: userId });
        let userExerciseLogs=await getLogsPerDateRange(userId,new Date(startDate)[Symbol.toPrimitive]('number'),new Date(endDate)[Symbol.toPrimitive]('number'), limit)
        let  newResultingUserExerciseLog={
            username:userLoger.username,
            count:userLoger.count,
            _id:userId,
            logs:userExerciseLogs.slice(0,limit)
        }

        return res.json(newResultingUserExerciseLog);
        


    }catch(err){
        console.error(err)
        next(err)
    }
}

const getLogsPerDateRange= async (...data)=>{
    let userLog= await log.findById({_id: data[0] });
    let count=0;
    let userLogRange= userLog.logs.filter((x)=>{
        let currentDate= new Date(x.date)[Symbol.toPrimitive]('number')
        if (currentDate> data[1] && currentDate< data[2]){
            return currentDate
        }
        count++;
        if (count== data[3]){
            return currentDate
        }
    });
    return userLogRange;
}

module.exports = { createLog, loggedUser, getExeciseLogCount,viewUserLogs,  normalOrRangeUserLogs, updateUserLogs};