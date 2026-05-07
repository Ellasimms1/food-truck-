const { request } = require('http')
const path = require('path')
const router = require('express').Router()

const root = path.join(__dirname, '..', 'public')

router.get('/', (request, response) => {
    response.sendFile('index.html' {root})
})

router.get('/menu', (request, response) => {
    response.sendFile('index.html', {root})
})

router.get('/menu/:id', (request, response) => {
    response.sendFile('index.html', {root})
})

router.get('/events', (request, response) => {
    response.sendFile('index.html', {root})
})

router.get('/events/:id', (request, response) => {
    response.sendFile('index.html', {root})
})

router.post('/menu', (request, response) => {
    response.sendFile('admin.html', {root})
})

router.post('/events', (request, response) => {
    response.sendFile('admin.html', {root})
})

module.exports = router