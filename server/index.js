import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import todoRoutes from './routes/todo.js';
import labelRoutes from './routes/label.js';
import userRoutes from './routes/user.js';
import cookieParser  from "cookie-parser";
import passport  from "passport";

import "./middlewares/passport-middlewares.js";


const app = express();


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());
app.use(express.json());

// Todos
app.use('/', todoRoutes);

// Labels
app.use('/',labelRoutes);

// Users
app.use('/',userRoutes);


// for all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send();
});

// Start the Express server
const port = 8001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});