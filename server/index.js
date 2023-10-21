const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const pool = require("./db");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

//allTodos
app.get('/todos', async(req, res) => {
  try{
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);

  }catch(error) {
    res.json("todo not exist");
    // console.error(err.message);
  }
});

// todosById
app.get('/todos/id/:id', async(req, res) => {
  try{
    const {id} = req.params;
    const todo = await pool.query("SELECT * FROM todo IF todo_id = $1",[id]);
    res.json(todo.rows[0]);
  }catch(error){
    res.json("todo not exist");
  }
  });

// Type search 
app.get('/todos/type/:type', async(req, res) => {
  try {
   const {type} = req.params;
   const searchTodo = await pool.query("SELECT * FROM todo WHERE TYPE = $1 ",[type]);
   res.json(searchTodo.rows);
 } catch (error) {
    res.json("todo not exist");
 }     
 });

 // Combined search 
app.get('/todos', async(req, res) => {
  try {
   const  todo= req.query.todo;
   if(todo === todo_id){
    const idTodo = await pool.query("SELECT * FROM todo WHERE todo_id =$1",[todo]);
   res.json(idTodo.rows);
   } else if(type === todo){
    const typeTodo = await pool.query("SELECT * FROM todo WHERE TYPE = $1",[todo]);
   res.json(typeTodo.rows);
   } else {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
   }
   
 } catch (error) {
    res.json("todo not exist");
 }     
 });

    // General search 
  app.get('/todos/search', async(req, res) => {
    try {
      const search = req.query.search;
      const searchTodo = await pool.query("SELECT * FROM todo WHERE CONTENT LIKE $1 OR TYPE LIKE $2",['%' + search + '%','%' + search + '%']);
      res.json(searchTodo.rows);
    } catch (error) {
      res.json("todo not exist");
      
    }   
  });

  // In Database
  app.post('/todos', async(req, res) => {
    try {
      const { title, type,content } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO todo (title, type,content) VALUES($1,$2,$3) RETURNING * ",
        [title , type , content]
      );
      res.json(newTodo.rows[0]);

    }catch (err) {
      console.error(err.message);

    }
  });

  // // Update al by id
  // app.put('/todos/:id', async(req,res)=>{
  //   try {
  //     const {id} = req.params;
  //     const titl = req.body.title;
  //     const typ = req.body.type;
  //     const cont = req.body.content;
  //     if(todo_it == id){
  //       const updateTodo = await pool.query(
  //         "UPDATE todo SET TITLE = $1 WHERE todo_id = $2",
  //         [titl,id]
  //       );
  //     }
  //     if(type == typ){
  //       const updateTodo = await pool.query(
  //         "UPDATE todo SET TYPE = $3 WHERE todo_id = $4",
  //         [typ,id]
  //       );
  //     }
  //     if(content == cont){
  //       const updateTodo = await pool.query(
  //         "UPDATE todo SET CONTENT = $5 WHERE todo_id = $6",
  //         [cont,id]
  //       );
  //     }
   
  //     res.json("Todo was updated");
      
  //   } catch (error) {
  //     res.json("Todo not exist");
      
  //   }
  // });

  // Update title by id
  app.put('/todos/title/:id', async(req,res)=>{
    try {
      const {id} = req.params;
      const {title} = req.body;
      const updateTodo = await pool.query(
        "UPDATE todo SET TITLE = $1 WHERE todo_id = $2",
        [title,id]
      );
      res.json("Todo was updated");
      
    } catch (error) {
      res.json("Todo not exist");
      
    }
  });

  // Update type by id
  app.put('/todos/type/:id', async(req,res)=>{
    try {
      const {id} = req.params;
      const {type} = req.body;
      const updateTodo = await pool.query(
        "UPDATE todo SET TYPE = $1 WHERE todo_id = $2",
        [type,id]
      );
      res.json("Todo was updated");
      
    } catch (error) {
      res.json("Todo not exist");
      
    }
  });

  // Update content by id
  app.put('/todos/content/:id', async(req,res)=>{
    try {
      const {id} = req.params;
      const {content} = req.body;
      const updateTodo = await pool.query(
        "UPDATE todo SET CONTENT = $1 WHERE todo_id = $2",
        [content,id]
      );
      res.json("Todo was updated");
      
    } catch (error) {
      res.json("Todo not exist");
      
    }
  });

// Delete by id or type
app.delete('/todos/:param', async(req,res)=>{
  console.log("vtrfr")
  const { param } = req.params;
  try {
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1 OR TYPE = $2",[param, param ]);
    res.json("Todo with ID or Type " + param + " was deleted");

  } catch (error) {
    res.status(404).json("Todo with the specified " + param + " does not exist");
  }
});

// for all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send();
});

// Start the Express server
const port = 8001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

