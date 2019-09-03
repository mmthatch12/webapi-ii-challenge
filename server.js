const express = require('express')

const server = express()

const db = require('./data/db')

server.use(express.json())

server.post('/api/posts', (req, res) => {
    const postInfro = req.body
    
    if(postInfro.title && postInfro.contents) {
        db.insert(postInfro)
        .then(dat => {
            res.status(201).json(dat)
        })
        .catch(error => {
            res.send(error)
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }

    db.insert()
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
})






module.exports = server