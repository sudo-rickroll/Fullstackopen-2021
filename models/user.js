const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

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

phonebookSchema.set('toJSON', { transform : (sendingDocument, receivingDocument) => {
  receivingDocument.id = receivingDocument._id.toString()
  delete receivingDocument.__v
  delete receivingDocument._id
}
})

phonebookSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', phonebookSchema)
