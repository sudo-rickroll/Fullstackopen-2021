express = require('express')
app = express()

app.use(express.json())

let notes = [
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
    response.send(notes)
})

app.get("/info", (request, response) => {
    response.send(`<p>Phonebook has info for ${notes.length} people</p>
    <p>${new Date()}</p>`)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(item => item.id === id)
    if (note){
        return response.send(note)
    }
    return response.status(404).end()
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(item => item.id !== id)
  response.status(200).end()
})

app.post("/api/persons", (request, response) => {
  const item = request.body
  notes = notes.concat({
    id : Math.floor(Math.random() * 1000000),
    ...item
  })
  response.send(notes)
})

const PORT = 3001
app.listen(PORT)