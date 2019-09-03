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

//this one isn't working yet?
server.post('/api/posts/:id/comments', (req, res) => {
    const comment = req.body;
    const id = req.params.id;

    if(comment.id !== id) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
        
    } 

    db.insertComment(comment)
    .then(dat => {
        res.status(201).json(dat)
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    }) 
     
})

server.get('/api/posts', (req, res) => {
    db.find()
        .then(dat => {
            res.status(200).json(dat)
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})


//could not get error statement to work
server.get('/api/posts/:id', (req, res) => {
    const postId = req.params.id;

    db.findById(postId)
        .then(dat => {
            res.status(200).json(dat)
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
    
    // if(postId !== db.post_id) {
    //     res.status(404).json({ message: "The post with the specified ID does not exist." })
    // } else {
    //     db.findById(postId)
    //     .then(dat => {
    //         res.status(200).json(dat)
    //     })
    //     .catch(error => {
    //         res.status(500).json({ error: "The post information could not be retrieved." })
    //     })
    // }
    

})

//don't have the error statements hooked up yet
server.get('/api/posts/:id/comments', (req, res) => {
    const postId = req.params.id;

    db.findCommentById(postId)
        .then(dat => {
            res.status(200).json(dat)
        })
        .catch(dat => {
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
})


//need to get 404 error working
server.delete('/api/posts/:id', (req, res) => {
    const postId = req.params.id;

    db.remove(postId)
        .then(dat => {
            res.status(200).json(dat)
        })
        .catch(error => {
            res.status(500).json({ error: "The post could not be removed" })
        })
})

server.put('/api/posts/:id', (req, res) => {
    const postInfro = req.body
    const postId = req.params.id;

    if(postInfro.title && postInfro.contents) {
        db.insert(postInfro)
        .then(dat => {
            res.status(200).json(dat)
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