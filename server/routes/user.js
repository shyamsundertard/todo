import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const userRoutes = Router();
const prisma = new PrismaClient();

  //Get users
  userRoutes.post("/users", async (req,res)=>{
    const users = await prisma.label.findMany({

    })
    res.json(users);
  });

    // userById
    userRoutes.post('/user/:id', async(req, res) => {
  try{
    const id = req.params.id;
    const user = await prisma.label.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    if (user) {
      res.json(user);
    } else {
      res.json("User not exist");
    }
    
  }catch(error){
    res.json("some error");
  }finally {
    await prisma.$disconnect();
  }
  });

 // Todos of user  
 userRoutes.post('/todos/user/:user', async(req, res) => {
    try {
     const {user} = req.params;
     const searchLabel = await prisma.user.findUnique({
            where:{
              labelName: label
            }
     });
  
     if(searchUser){
      const todos = await prisma.todo.findMany({
        where: {userId: searchUser.id },
      });
      res.json(todos);
     }
  
     
   } catch (error) {
      res.json("Label not exist");
   }  finally {
    await prisma.$disconnect();
  }   
   });

   // Add new user
   userRoutes.post('/newUser', async(req, res) => {
    try {
      const user = await prisma.user.create({
        data: {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        },
      });
      res.json(user);      
    } catch (e) {
      console.error(e);
      
    } finally {
      await prisma.$disconnect();
    }
   
  });

    // Update user
    userRoutes.put("/users/:id", async (req,res) => {
      try {
        const {id} = req.params;
        const {user} = req.body;
        const updateUser = await prisma.user.update({
        where: {id: parseInt(id)},
        data:{
            user,
        },
      })
      console.log(id)
      res.json(updateUser)
      } catch (e) {
        res.json(e);
      } finally {
        await prisma.$disconnect();
      }
      
    });
  
  
  // Delete User
  userRoutes.delete("/users/:id", async(req, res)=>{
      try {
        const {id} = req.params;
        
         await prisma.user.delete({
        where:{
          id: parseInt(id),
        }
      })
      res.json(id);
      } catch (e) {
        res.status(404).json(e);
      }finally {
        await prisma.$disconnect();
      }
  });

export default userRoutes;