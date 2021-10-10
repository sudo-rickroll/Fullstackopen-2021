mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log("Command missing password. It should match the following pattern - node mongo.js <password> <name:optional> <number:optional>")
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://ServiceAccount:${password}@fullstackopen-2021.fzfch.mongodb.net/Phonebook?retryWrites=true&w=majority`

const phonebookSchema = new mongoose.Schema({
    name : String,
    number : String
})

const User = mongoose.model('User', phonebookSchema)

if (process.argv.length === 5){
    const username = process.argv[3]
    const usernumber = process.argv[4]
    const user = new User({
        name: username,
        number: usernumber
    })
    user.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        //mongoose.connection.close()
    })    
}

else if (process.argv.length === 3){
    User.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(user => console.log(`${user.name} ${user.number}`))
        //mongoose.connection.close()
    })
}
