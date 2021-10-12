require('dotenv').config()
const model = require("./models/users") 
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', (request, response) => {
  if (request.method === 'POST'){
    return JSON.stringify(request.body)
  }
  return " "
})

app.get("/api/persons", (request, response) => {
    model.find({}).then(persons => response.send(persons)).catch(error => response.send())
})

app.get("/info", (request, response) => {
  model.find({}).then(persons => response.send(response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`))).catch(error => response.send(error))    
})

app.get("/api/persons/:id", (request, response) => {
  model.findById(request.params.id).then(person => {    
    if (person){
        return response.send(person)
    }
    return response.status(404).end()
  }).catch(error => response.send(error))
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(item => item.id !== id)
  response.status(200).end()
})

app.post("/api/persons", (request, response) => {
  const person = request.body
  if (!('name' in person ) || !('number' in person)){
    return response.status(404).send({
      error : "Please make sure that both the name and numbers are entered."
    })
  }
  persons = persons.concat({
    id : Math.floor(Math.random() * 1000000),
    ...person
  })
  response.send(persons)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Application started in port ${PORT}`)
})