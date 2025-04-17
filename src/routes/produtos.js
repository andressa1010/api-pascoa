import express from "express"
import prisma from "../prisma/cliente.js"


const router = express.Router()

router.get("/", async (req, res) => {
   try {
     const listaDePascoa = await prisma.produtos.findMany();
     res.status(200).json(listaDePascoa);
   } catch (error) {
     console.error("Erro no Render:", error); // ISSO AQUI MOSTRA NOS LOGS
     res.status(500).json({ mensagem: "Erro ao buscar produtos!" });
   }
 });


router.post("/", async (req,res)=>{
    try{
        const {nome, imagem, price, descricao, tipo}= req.body
       
        const criarProdutosPascoa = await prisma.produtos.create({
              data:{nome, imagem, price, descricao, tipo}
        })

        res.status(201).json(criarProdutosPascoa)

    }
    catch(error){
       res.status(404).json({mensagem:"Erro ao criar produtos novos dados invalidos!"})
    }
})



router.put("/:id", async (req,res)=>{
     try{
        const {id} = req.params
        const {nome, imagem , price, descricao, tipo}=req.body

        const atualizarProdutosPascoa = await prisma.produtos.update({
             where:{
                 id: id
             },
             data:{
                nome, imagem, price, descricao, tipo
             }
        })

        res.status(200).json(atualizarProdutosPascoa)
     }
     catch(error){
         res.status(404).json({mensagem: "Erro ao atualizar produtos, verifique os dados e tente novamente!"})
     }
})

router.get("/:id", async (req,res)=>{
  try{
     const {id} =req.params

     const buscarProdutosPascoaId = await prisma.produtos.findUnique({
          where:{id: id}
     })

     res.status(200).json(buscarProdutosPascoaId)
  }
  catch(error){
     res.status(404).json({mensagem:"produto não encontrado tente novamente!"})
  }
})

router.delete("/:id", async (req,res)=>{
   try{
     const {id} =req.params

     const deletarProdutosPascoa = await prisma.produtos.delete({
          where:{id: id}
     })

     res.status(204).json({mensagem:"Produto deletado com sucesso!"}, deletarProdutosPascoa)
   }
   catch(error){
      res.status(404).json({mensagem:"Erro ao deletar produto!"})
   }
})

router.get("/com-encomendas", async (req, res) => {
   try {
     const produtosComEncomendas = await prisma.produtos.findMany({
       include: {
         encomendas: true
       }
     })
 
     res.status(200).json(produtosComEncomendas)
   } catch (error) {
     res.status(500).json({ mensagem: "Erro ao buscar produtos com encomendas!" })
   }
 })
 


export default router