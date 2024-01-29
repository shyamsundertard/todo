import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import pkg from 'bcryptjs';
const { hash } = pkg;
import pkge from 'jsonwebtoken';
const { sign } = pkge;
import { loginValidation, registerValidation } from "../validators/auth.js";
import { validationMiddleware } from "../middlewares/validations-middlewares.js";
import { userAuth } from "../middlewares/auth-middlewares.js";

const userRoutes = Router();
const prisma = new PrismaClient();

const SECRET = process.env.SECRET;


  //Get users
  userRoutes.post("/get-users", async (req,res)=>{
    try {
      const users = await prisma.user.findMany({ 
        select: { 
          id: true, 
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true,
          todos: true
        } 
      });
  
      return res.status(200).json({
        users: users,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        error: error.message,
      });
    }finally {
      await prisma.$disconnect();
    }
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
//  userRoutes.post('/todos/user/:user', async(req, res) => {
//     try {
//      const {user} = req.params;
//      const searchLabel = await prisma.user.findUnique({
//             where:{
//               labelName: label
//             }
//      });
  
//      if(searchUser){
//       const todos = await prisma.todo.findMany({
//         where: {userId: searchUser.id },
//       });
//       res.json(todos);
//      }
  
     
//    } catch (error) {
//       res.json("Label not exist");
//    }  finally {
//     await prisma.$disconnect();
//   }   
//    });

   // Add new user
   userRoutes.post('/register', registerValidation, validationMiddleware, async(req, res) => {
    try {
      const hashedPassword = await hash(req.body.password, 10);
  
      await prisma.user.create({
        data: {
          email: req.body.email,
          firstName: req.body.firstName ,
          lastName: req.body.lastName ,
          password: hashedPassword,
        },
      });
  
      return res.status(201).json({
        message: 'Registration was successful',
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        error: error.message,
      });
    }finally {
      await prisma.$disconnect();
    }
  });

    // Update user
    // userRoutes.put("/users/:id", async (req,res) => {
    //   try {
    //     const {id} = req.params;
    //     const {user} = req.body;
    //     const updateUser = await prisma.user.update({
    //     where: {id: parseInt(id)},
    //     data:{
    //         user,
    //     },
    //   })
    //   console.log(id)
    //   res.json(updateUser)
    //   } catch (e) {
    //     res.json(e);
    //   } finally {
    //     await prisma.$disconnect();
    //   }
      
    // });
  
  
  // Delete User
userRoutes.delete("/user/:id", async(req, res)=>{
    try {   
      const id = req.params.id;
        await prisma.user.delete({
          where:{
               id: parseInt(id)
          },
        });
        res.json(id);

    } catch (e) {
      res.status(404).json(e);
    }finally {
      await prisma.$disconnect();
    }
});

// Login
userRoutes.post('/login',loginValidation ,validationMiddleware , async(req, res) => {

  try {
    const token = sign(req.body, SECRET);

    return res
    .status(200)
    .cookie('token', token, { httpOnly: true })
    .json({
      message: 'Logged in successfully',
    });
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }finally {
    await prisma.$disconnect();
  }
});

// Protected route
userRoutes.post("/protectedInfo/:email",userAuth, async (req, res) => {
  try {
    const email = req.params.email;
    const user = await prisma.user.findUnique({
      where: {
        email: email
      },
      select: {
        todos:true
      }
    });
    if (user) {
      res.json(user);
    } else {
      res.json("User not exist");
    }
  } catch (error) {
      console.log(error.message);
  }finally {
    await prisma.$disconnect();
  }
});

// Protected route
userRoutes.post("/protectedInfo",userAuth, async (req, res) => {
  try {
    const user = req.user;
    // console.log(user);

    const todos = await prisma.todo.findMany({
      where:{
        userId: parseInt(user.id),
      }
    })
    // console.log(todos)

    return res.status(200).json({
      todos:todos,
      user:user
    });
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }finally {
        await prisma.$disconnect();
      }
});

// logout
userRoutes.post ("/logout" , async (req, res) => {
  try {
    return res
    .status(200)
    .clearCookie('token', { httpOnly: true })
    .json({
      message: 'Logged out succefully',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }finally {
    await prisma.$disconnect();
  }
});

export default userRoutes;