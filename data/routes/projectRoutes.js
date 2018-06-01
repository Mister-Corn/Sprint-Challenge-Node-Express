/* --- Dependencies --- */
//Express
const express = require('express');
const router = express.Router();
//Models
const projectModel = require('../helpers/projectModel.js');

/* --- '/api/projects' Endpoints --- */
// Create

// Read
router.get('/', (req, res) => {
  //==>
  projectModel.get()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      console.log(`'/api/projects' GET error:`,err);
      res.status(500).json({error: 'Projects could not be retrieved.'});
    })
})
// Update

// Delete

module.exports = router;