const model = require('../models/user')
const router = require('express').Router()

router.get('/', (request, response, next) => {
  model.find({}).then(persons => response.send(persons)).catch(error => next(error))
})

router.get('/info', (request, response, next) => {
  model.find({}).then(persons => response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)).catch(error => next(error))
})

router.get('/:id', (request, response) => {
  model.findById(request.params.id).then(person => {
    if (person){
      return response.send(person)
    }
    return response.status(404).end()
  }).catch(error => response.send(error))
})

router.delete('/:id', (request, response, next) => {
  model.findByIdAndRemove(request.params.id).then(result => {
    if (result){
      return response.status(204).end()
    }
    response.status(404).end()
  }).catch(error => {
    next(error)
  })
})

router.post('/', (request, response, next) => {
  const person = new model(request.body)
  person.save().then(result => response.send(`<p>added ${result.name} successfully to phonebook`)).catch(error => next(error))
})

router.put('/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name : body.name,
    number : body.number
  }
  model.findByIdAndUpdate(request.params.id, person, { new: true }).then(updatedPerson => {
    response.status(204).send(updatedPerson)
  }).
    catch(error => next(error))
})

module.exports = router