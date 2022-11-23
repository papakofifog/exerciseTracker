const mongoose= require('mongoose')

const UserSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }
})

UserSchema.methods.introduce = function introduce(){
    data={
        username:this.username,
        _id: this._id
    }
    return data
}

UserSchema.methods.getUserId= async (id)=>{
    try{
        data= await this.findById({_id: id})
        return data;
    }catch(err){
        return err;
    }
}



module.exports= mongoose.model('User',UserSchema);