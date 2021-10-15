mongoose = require('mongoose')
uniqueValidator = require('mongoose-unique-validator')
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.connect(url).then(result => console.log('Connected to database')).catch(error => console.log('Error connecting to database: ', error.message))

const phonebookSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minLength : 3,
        unique : true
    },
    number : {
        type : String,
        required : true,
        minLength : 8
    }
})

phonebookSchema.set('toJSON', {transform : (sendingDocument, receivingDocument) =>{
    receivingDocument.id = receivingDocument._id.toString()
    delete receivingDocument.__v
    delete receivingDocument._id
}})

phonebookSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User',phonebookSchema)
