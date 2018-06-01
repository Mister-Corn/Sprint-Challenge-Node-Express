/* --- Dependencies --- */
//Express
const express = require('express');
const router = express.Router();
//Models
const actionModel = require('../helpers/actionModel.js');

/* --- '/api/actions' Endpoints --- */
// CREATE
router.post('/', (req, res) => {
  const { project_id, description } = req.body;
  let { notes, completed } = req.body;
  if (!project_id || !description) {
    console.log("'/api/actions' POST Possible incomplete request:",req.body);
    res.status(400).json({error:"Please ensure 'project_id' and 'description' is in body of the request."});
    return;
  }
  if (!completed) completed === false;
  if (!notes) notes === "";
  //==>
  actionModel.insert({ project_id, description, notes, completed })
    .then(project => {
      res.json(project);
    })
    .catch(err => {
      console.log(`'/api/actions' POST error:`,err);
      if (err.errno === 19) {
        res.status(400).json({error:"Please ensure body of the request is correctly formatted. 'project_id' and 'description' are mandatory properties. You may also have 'notes' and 'completed'."});
        return;
      }
      res.status(500).json({error: 'Action could not be added.'});
    });
});

// READ
// // Retrieve all actions
router.get('/', (req, res) => {
  //==>
  actionModel.get()
    .then(actions => {
      res.json(actions);
    })
    .catch(err => {
      console.log(`'/api/actions' GET error:`,err);
      res.status(500).json({error: 'Actions could not be retrieved.'});
    })
});
// // Retrieve a specific actions
router.get('/:actionId', (req, res) => {
  const { actionId } = req.params;
  //==>
  actionModel.get(actionId)
    .then(action =>{
      if (action.length === 0) {
        res.status(404).json({error:`Action with ID:${actionId} not found.`});
        return;
      }
      res.json(action);
    })
    .catch(err => {
      console.log(`'/api/actions/${actionId}' GET error:`,err);
      res.status(500).json({error: 'Actions could not be retrieved.'});
    });
});

// UPDATE
router.put('/:actionId', (req, res) => {
  const { actionId } = req.params;
  const action = req.body;
  //==>
  actionModel.update(actionId, action)
    .then(action =>{
      if (action === null) {
        res.status(404).json({error:`Action with ID: ${actionId} not found.`});
        return;
      }
      res.json(action);
    })
    .catch(err => {
      console.log(`'/api/actions' UPDATE error:`,err);
      res.status(500).json({error: `Action with ID: ${actionId} could not be updated.`});
    });
});

// DELETE
router.delete('/:actionId', (req, res) => {
  const { actionId } = req.params;
  //==>
  actionModel.remove(actionId)
    .then(count => {
      console.log("'/api/actions' DELETE count:",count);
      if (count === 0) {
        res.status(500).json({error:`Action with ID: ${actionId} could not be deleted.`});
        return;
      } else {
        res.json({message:"Deletion Successful."});
      }
    })
    .catch(err => {
      console.log(`'/api/actions' DELETE error:`,err);
      res.status(500).json({error: `Action with ID: ${actionId} could not be deleted.`});
    });
});

module.exports = router;