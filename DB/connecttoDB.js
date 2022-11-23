const { default: mongoose } = require('mongoose')

require('dotenv').config()

async function main(){
    
        const dbConnection= await mongoose.connect(
        process.env['MONGO_SECRET_KEY'],
        { useNewUrlParser: true, useUnifiedTopology: true })
        return dbConnection;
}

module.exports= main;
