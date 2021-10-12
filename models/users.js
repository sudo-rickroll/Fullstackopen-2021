mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.connect(url).then(result => console.log('Connected to database')).catch(error => console.log('Error connecting to database: ', error.message))

const phonebookSchema = new mongoose.Schema({
    name : String,
    number : String
})

phonebookSchema.set('toJSON', {transform : (sendingDocument, receivingDocument) =>{
    receivingDocument.id = receivingDocument._id.toString()
    delete receivingDocument.__v
    delete receivingDocument._id
}})

module.exports = mongoose.model('User',phonebookSchema)
