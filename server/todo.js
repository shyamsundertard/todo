import { Router } from "express";
import { PrismaClient } from '@prisma/client'

const todoRoutes = Router();
const prisma = new PrismaClient();


// allTodos
todoRoutes.get("/todos", async(req, res)  =>{
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
   todoRoutes.get('/todos/id/:id', async(req, res) => {
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
  todoRoutes.get('/todos/title/:title', async(req, res) => {
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

   // General search 
   todoRoutes.get('/todos/search', async(req, res) => {
    try {
      const search = req.query.search;
      const searchTodo = await prisma.todo.findMany({
              where:{
                OR:[
                  {
                    title:{
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
  todoRoutes.post('/todos', async(req, res) => {
    try {
      
      const todo = await prisma.todo.create({
        data: {
          title: req.body.title,
          content: req.body.content,
         
        },
      });
      res.json(todo);
      
      
    } catch (e) {
      console.error(e);
      
    } finally {
      await prisma.$disconnect();
    }
   
  });

  //Update Todo by id
  todoRoutes.put('/todos/:id',async(req,res)=>{
    try {
      const {id} = req.params;
      const {title,content} = req.body;
      const updateData ={};

      if (title) {
        updateData.title = title;
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

  // Delete todo 
  todoRoutes.delete('/todos/:id', async(req,res)=>{
  try {
    const id = req.params.id;

    const deleteTodo = await prisma.todo.delete({
      where: {
            todo_id : parseInt(id)
          
      }
    });
    res.json(id);
  } catch (e) {
    res.status(404).json(e);
  }finally {
    await prisma.$disconnect();
  }
});

export default todoRoutes;