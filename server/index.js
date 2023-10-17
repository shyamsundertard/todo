const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");

const app = express();

app.use(bodyParser.json());

let todosData = require('./todos.json');

function findIndex(arr, id) { 
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return -1;
}

function removeAtIndex(arr, index) {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) newArray.push(arr[i]);
  }
  return newArray;
}

app.get('/todos', (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.get('/todos/id/:id', (req, res) => {
  let id = req.params.id;
  let result = todosData.info.find((info)=>{
    if(info.id == id ) return true;
    else return false
  })
    if (result === undefined) {
      res.status(404).send();
    } else {
      res.json(result);
    }
  });


  // Content search content
  app.get('/todos/params', (req, res) => {
    let content = req.query.content ;
    let newTodoData = todosData.info.filter((info)=>{
      if(info.content.includes(content)) return true;
      else return false;
    });
      res.json(newTodoData);

  });

    // Content search 
  app.get('/todos/search', (req, res) => {
    const search = req.query.search;
    let newTodoData = todosData.info.filter((info)=>{
      if(info.content.includes(search) || info.type.includes(search)) return true;
      else return false;
    });
    res.json(newTodoData);    

  });

app.post('/todos', (req, res) => {
    const newId = todosData.id;
  const newTodo = {
    id: newId,
    title: req.body.title,
    type : req.body.type,
    content: req.body.content
  };

  // Increment in value of id of todo data
  todosData.id += 1;
  
  todosData.info.push(newTodo);

    fs.writeFile("todos.json", JSON.stringify(todosData, null, 2), (err) => {
      if (err) throw err;
      res.status(201).json(newTodo);
    });
  });

app.put('/todos/title/:id', (req, res) => {
    const todoIndex = findIndex(todosData.info, parseInt(req.params.id));
    const cont = todosData.info[todoIndex].content;
    if (todoIndex === -1) {
      res.status(404).send();
    } else {
      const updatedTodo = {
        id: todosData.info[todoIndex].id,
        title: req.body.title,
        type : req.body.type,
        content: cont
      };
      todosData.info[todoIndex] = updatedTodo;
      fs.writeFile("todos.json", JSON.stringify(todosData,null,2), (err) => {
        if (err) throw err;
        res.status(200).json(updatedTodo);
      });
    }
  });

  app.put('/todos/content/:id', (req, res) => {
    const todoIndex = findIndex(todosData.info, parseInt(req.params.id));
    const titl = todosData.info[todoIndex].title;
    if (todoIndex === -1) {
      res.status(404).send();
    } else {
      const updatedTodo = {
        id: todosData.info[todoIndex].id,
        title: titl,
        type : req.body.type,
        content: req.body.content
      };
      todosData.info[todoIndex] = updatedTodo;
      fs.writeFile("todos.json", JSON.stringify(todosData,null,2), (err) => {
        if (err) throw err;
        res.status(200).json(updatedTodo);
      });
    }
  });

      app.put('/todos/type/:id', (req, res) => {
        const todoIndex = findIndex(todosData.info, parseInt(req.params.id));
        const typ = todosData.info[todoIndex].type;
        if (todoIndex === -1) {
          res.status(404).send();
        } else {
          const updatedTodo = {
            id: todosData.info[todoIndex].id,
            title: req.body.title,
            type : typ,
            content: req.body.content
          };
          todosData.info[todoIndex] = updatedTodo;
      fs.writeFile("todos.json", JSON.stringify(todosData,null,2), (err) => {
        if (err) throw err;
        res.status(200).json(updatedTodo);
      });
    }
  });


app.delete('/todos/:id', (req, res) => {

    const todoIndex = findIndex(todosData.info, parseInt(req.params.id));
  
    if (todoIndex === -1) {
      res.status(404).send({
        "error": "todo not found"
      });
    } else {
      todosData.info = removeAtIndex(todosData.info, todoIndex);
      fs.writeFile("todos.json", JSON.stringify(todosData, null, 2), (err) => {
        if (err) throw err;
      });
      res.status(200).send({
        "message":"todo successfully deleted"});

    }
  });
  app.delete('/todos/delete/:id', (req, res) => {

    const todoIndex = findIndex(todosData.info, parseInt(req.params.id));
  
    if (todoIndex === -1) {
      res.status(404).send({
        "error": "todo not found"
      });
    } else {
      todosData.info = removeAtIndex(todosData.info, todoIndex);
      fs.writeFile("todos.json", JSON.stringify(todosData, null, 2), (err) => {
        if (err) throw err;
      });
      res.status(200).send({
        "message":"todo successfully deleted"});

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

