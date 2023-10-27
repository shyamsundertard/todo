import { PrismaClient } from '@prisma/client'
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

//allTodos
app.get('/todos', async(req, res) => {
  try{
    const allTodos = await prisma.todo.findMany({
    });
    res.json(allTodos);
  }catch(e) {
    res.json(e);
  } finally {
    await prisma.$disconnect();
  }
});

// todosById
app.get('/todos/id/:id', async(req, res) => {
  try{
    const id = req.params.id;
    const todo = await prisma.todo.findUnique({
      where: {
        todo_id: parseInt(id)
      }
    });
    res.json(todo);
  }catch(error){
    res.json("Todo not exist");
  }finally {
    await prisma.$disconnect();
  }
  });

// Title  
app.get('/todos/title/:title', async(req, res) => {
  try {
   const {title} = req.params;
   const searchTodo = await prisma.todo.findMany({
          where:{
            title: {
              contains: title,
              mode: 'insensitive'
            }
          }
   });
   res.json(searchTodo);
 } catch (error) {
    res.json("todo not exist");
 }  finally {
  await prisma.$disconnect();
}   
 });

 // Type  
app.get('/todos/type/:type', async(req, res) => {
  try {
   const {type} = req.params;
   const searchTodo = await prisma.todo.findMany({
          where:{
            type: {
              contains: type,
              mode: 'insensitive'
            }
          }
   });
   res.json(searchTodo);
 } catch (error) {
    res.json("todo not exist");
 }  finally {
  await prisma.$disconnect();
}   
 });

    // General search 
  app.get('/todos/search', async(req, res) => {
    try {
      const search = req.query.search;
      const searchTodo = await prisma.todo.findMany({
              where:{
                OR:[
                  {
                    type:{
                      contains: search,
                      mode: 'insensitive'
                    }
                  },{
                    content:{
                      contains: search,
                      mode: 'insensitive'
                    }
                  }
                ]
              }
      });
      res.json(searchTodo);
    } catch (error) {
      res.json("todo not exist");
      
    }   finally {
      await prisma.$disconnect();
    }
  });

  // In Database
  app.post('/todos', async(req, res) => {
    try {
      await prisma.todo.create({
        data: req.body
      });
      res.json("Todo created successfully");      
    } catch (e) {
      console.error(e);
      
    } finally {
      await prisma.$disconnect();
    }
   
  });

  //Update by id
  app.put('/todos/:id',async(req,res)=>{
    try {
      const {id} = req.params;
      const {title,type,content} = req.body;
      const updateData ={};

      if (title) {
        updateData.title = title;
      }
  
      if (type) {
        updateData.type = type;
      }
  
      if (content) {
        updateData.content = content;
      }

      const updateTodo = await prisma.todo.update({
        where:{
          todo_id: parseInt(id)
        },
        data:updateData
      });
      res.json("Todo updated successfully");
      
    } catch (e) {
      res.json(e);
    } finally {
      await prisma.$disconnect();
    }
  });

// Delete  
app.delete('/todos', async(req,res)=>{
  try {
    const {id,type} = req.query;

    if (!id && !type) {
      return res.status(400).json({ error: 'Either provide "id" or "type" in the query parameters to delete .' });
    }

    const deleteTodo = await prisma.todo.deleteMany({
      where: {
        OR:[
          {
            todo_id : id? parseInt(id) : undefined,
          },{
            type : type || undefined,
          }
        ]
      }
    });
    res.json("Todo deleted");

  } catch (e) {
    res.status(404).json(e);
  }finally {
    await prisma.$disconnect();
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

