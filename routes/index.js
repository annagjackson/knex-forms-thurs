var express = require('express')

var db = require('../db')

module.exports = {
  get: get,
  newUser: newUser,
  addUser: addUser,
  editUser: editUser
}

function get (req, res) {
  db.getUsers()
    .then(function (users) {
      res.render('index', { users: users })
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
}

function newUser (req, res) {
  res.render('form', null)
}

function addUser (req, res) {
  var user = {
    name: req.body.name,
    email: req.body.email
  }
  db.addUser(user)
  .then(function (){
    res.redirect('/')
  })
  .catch(function (err){
    res.status(500).send(err.message)
  })
}

function editUser (req, res) {
  var data = {
    name: req.params.name,
    email: req.params.email
  }
  db.editUser(req.params.id, data)
    .then(function (){
      res.redirect('/')
    })
}
