const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser= require('body-parser');
const main=  require('./DB/connecttoDB')
const errorHandler= require('./Middlewares/handleErrors')


app.use(express.json())
app.use(express.urlencoded({ extended: true}))


app.use('/api/', require('./Middlewares/routes/userRoutes'))
app.use('/api/',require('./Middlewares/routes/execiseRoutes'))
app.use('/api',require('./Middlewares/routes/logRoutes'))

app.use(cors())
app.use(express.static('./View/public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/View/views/index.html')
});

// Middleware to handle Errors
app.use(errorHandler)


//connect to db
main()


const listener = app.listen(process.env.PORT || 10000, () => {
  console.log(`Your app is listening on http://localhost:${listener.address().port}`)
})
