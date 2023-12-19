import { PrismaClient } from '@prisma/client'
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import todoRoutes from './todo.js';
import labelRoutes from './label.js';


const app = express();
const prisma = new PrismaClient();


app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Todos
app.use('/', todoRoutes);

// Labels
app.use('/',labelRoutes);


// for all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send();
});

// Start the Express server
const port = 8001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

