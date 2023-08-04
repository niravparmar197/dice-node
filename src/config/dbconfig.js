const mongoose = require('mongoose');

const connectDB = async() =>{
    try {
        let db = await mongoose.connect(`mongodb://0.0.0.0:27017/myFirstDatabase?retryWrites=true&w=majority`,{ 
            useNewUrlParser: true , 
            useUnifiedTopology: true, 
            useFindAndModify: false,
            useCreateIndex: true })
        console.log(`Database connected to ${db.connection.host}`)
    } catch(err) {
        console.log(err)
    }
}

module.exports = {connectDB};
