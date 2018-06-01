/* --- Dependencies --- */
//Express
const express = require('express');
const router = express.Router();
//Models
const projectModel = require('../helpers/projectModel.js');

/* --- '/api/projects' Endpoints --- */
// CREATE
router.post('/', (req, res) => {
  const { name, description } = req.body;
  let { completed } = req.body;
  if (!name || !description) {
    console.log("'/api/projects' POST Possible incomplete request:",req.body);
    res.status(400).json({error:"Please ensure name and description is in body of the request."});
    return;
  }
  if (!completed) completed === false;
  //==>
  projectModel.insert({ name, description, completed })
    .then(project =>{
      res.json(project);
    })
    .catch(err => {
      console.log(`'/api/projects' POST error:`,err);
      if (err.errno === 19) {
        res.status(400).json({error:"Please ensure body of the request is correctly formatted."});
        return;
      }
      res.status(500).json({error: 'Project could not be added.'});
    });
});

// READ
// // Retrieve all projects
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
});
// // Retrieve a specific project
router.get('/:projectId', (req, res) => {
  const { projectId } = req.params;
  //==>
  projectModel.get(projectId)
    .then(project =>{
      if (project.length === 0) {
        res.status(404).json({error:`Project with ID:${projectId} not found.`});
        return;
      }
      res.json(project);
    })
    .catch(err => {
      console.log(`'/api/projects/${projectId}' GET error:`,err);
      res.status(500).json({error: 'Projects could not be retrieved.'});
    });
});
// // Retrieve the list of actions for a specific project
router.get('/:projectId/actions', (req, res) => {
  const { projectId } = req.params;
  //==>
  projectModel.getProjectActions(projectId)
    .then(actions =>{
      res.json(actions);
    })
    .catch(err => {
      console.log(`'/api/projects/${projectId}/actions' GET error:`,err);
      res.status(500).json({error: `Action list for project ID: ${projectId} could not be retrieved.`});
    });
});

// UPDATE
router.put('/:projectId', (req, res) => {
  const { projectId } = req.params;
  const project = req.body;
  //==>
  projectModel.update(projectId, project)
    .then(project =>{
      if (project === null) {
        res.status(404).json({error:`Project with ID:${projectId} not found.`})
      }
      res.json(project);
    })
    .catch(err => {
      console.log(`'/api/projects' UPDATE error:`,err);
      res.status(500).json({error:`Project with ID: ${projectId} could not be updated.`});
    });
});

// DELETE
router.delete('/:projectId', (req, res) => {
  const { projectId } = req.params;
  //==>
  projectModel.remove(projectId)
    .then(count => {
      console.log("'/api/projects' DELETE count:",count);
      if (count === 0) {
        res.status(500).json({error:`Project with ID: ${projectId} could not be deleted.`});
        return;
      } else {
        res.json({message:"Deletion Successful."});
      }
    })
    .catch(err => {
      console.log(`'/api/projects' DELETE error:`,err);
      res.status(500).json({error: 'Projects could not be deleted.'});
    });
});

module.exports = router;