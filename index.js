const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', (request, response) => {
  if (request.method === 'POST'){
    return JSON.stringify(request.body)
  }
  return " "
})

let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => {
    response.send(persons)
})

app.get("/info", (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(item => item.id === id)
    if (person){
        return response.send(person)
    }
    return response.status(404).end()
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
  if (persons.find(item => item.name.toLowerCase().trim() === person.name.toLowerCase().trim())){
    return response.status(403).send({
      error:"Name already exists"
    })
  }
  persons = persons.concat({
    id : Math.floor(Math.random() * 1000000),
    ...person
  })
  response.send(persons)
})

const PORT = 3001
app.listen(PORT)