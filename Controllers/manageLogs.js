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
            
            return newlog;
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





const getLogsPerDateRange= (startDate,endDate)=>{
    let userLog=log.findById({_id: req.params.id });
    let userLogRange= userLog.logs.filter((x)=>{
        let currentDate= new Date(x.date);
        if (currentDate>startDate && currentDate<endDate){
            return x
        }

    })
    return userLogRange;
}



const viewAlluserLogsPerDateRange= async (req, res, next)=>{
    try{
        let userId= req.params.id;
        let startDate= req.params.from;
        let endDate= req.params.to;
        let limit= req.params.limit;

        let userExerciseLogs=await getLogsPerDateRange(startDate,endDate)
       // console.log(userExerciseLogs);

    }catch(err){
        console.error(err)
        next(err)
    }
}


module.exports = { createLog, loggedUser, getExeciseLogCount,viewUserLogs,  viewAlluserLogsPerDateRange, updateUserLogs};