import express from "express"
import prisma from "../prisma/cliente.js"

const router = express.Router()

// Simples autenticação manual (sem token por enquanto)
const SENHA_ADMIN = "coelhinho123"

router.post("/encomendas", async (req, res) => {
  const { senha } = req.body

  if (senha !== SENHA_ADMIN) {
    return res.status(401).json({ mensagem: "Senha incorreta!" })
  }

  try {
    const encomendas = await prisma.encomenda.findMany({
      include: {
        produto: true
      }
    })

    res.status(200).json(encomendas)
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar encomendas!" })
  }
})

export default router
