/* --- Dependencies --- */
//Express
const express = require('express');
const server = express();
//Middleware
const helmet = require('helmet');
const cors = require('cors');
//Routes
const projectRoutes = require('./data/routes/projectRoutes.js');
const actionRoutes = require('./data/routes/actionRoutes.js');

/* --- MiddleWare --- */
server.use(helmet());
server.use(cors());
server.use(express.json());

/* --- Endpoints --- */
//Projects
server.use('/api/projects', projectRoutes);
//Actions
server.use('/api/actions', actionRoutes);

/* --- Server Start! --- */
const port = 5000;
server.listen(port, ()=>console.log(`\n=== Server Listening on Port ${port} ===\nStart Time: ${Date()}`));
