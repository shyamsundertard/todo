import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const labelRoutes = Router();
const prisma = new PrismaClient();

  //Get labels
  labelRoutes.get("/labels", async (req,res)=>{
    const labels = await prisma.label.findMany({

    })
    res.json(labels);
  });

    // labelById
    labelRoutes.get('/label/:id', async(req, res) => {
  try{
    const id = req.params.id;
    const label = await prisma.label.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    if (label) {
      res.json(label);
    } else {
      res.json("Label not exist");
    }
    
  }catch(error){
    res.json("some error");
  }finally {
    await prisma.$disconnect();
  }
  });

 // Todos of label  
 labelRoutes.get('/todos/label/:label', async(req, res) => {
    try {
     const {label} = req.params;
     const searchLabel = await prisma.label.findUnique({
            where:{
              labelName: label
            }
     });
  
     if(searchLabel){
      const todos = await prisma.todo.findMany({
        where: {labelId: searchLabel.id },
      });
      res.json(todos);
     }
  
     
   } catch (error) {
      res.json("Label not exist");
   }  finally {
    await prisma.$disconnect();
  }   
   });

   // Add new label
   labelRoutes.post('/labels', async(req, res) => {
    try {
      const label = await prisma.label.create({
        data: {
          labelName: req.body.labelName,
        },
      });
      res.json(label);      
    } catch (e) {
      console.error(e);
      
    } finally {
      await prisma.$disconnect();
    }
   
  });

    // Update label
    labelRoutes.put("/labels/:id", async (req,res) => {
      try {
        const {id} = req.params;
        const {labelName} = req.body;
        const updateLabel = await prisma.label.update({
        where: {id: parseInt(id)},
        data:{
          labelName,
        },
      })
      console.log(id)
      res.json(updateLabel)
      } catch (e) {
        res.json(e);
      } finally {
        await prisma.$disconnect();
      }
      
    });
  
  
  // Delete Label
  labelRoutes.delete("/labels/:id", async(req, res)=>{
      try {
        const {id} = req.params;
      const deleteLabel = await prisma.label.delete({
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

export default labelRoutes;