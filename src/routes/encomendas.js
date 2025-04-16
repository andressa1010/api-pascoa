import express from "express";
import prisma from "../prisma/cliente.js";
import { esquemaEncomenda } from "../Validation/validarEncomenda.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const validacao = esquemaEncomenda.safeParse(req.body);

    if (!validacao.success) {
      return res.status(400).json({
        mensagem: "Dados inválidos!",
        erros: validacao.error.issues,
      });
    }

    const { nome, email, celular, endereco, data, hora, produtoId } = req.body;

    const novasEncomendas = await prisma.encomenda.create({
      data: { nome, email, celular, endereco, data, hora, produtoId },
    });

    res.status(201).json(novasEncomendas);
  } catch (error) {
    res.status(404).json({
      mensagem: "Erro ao criar encomenda, por favor tente novamente!",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const listaDeEncomendas = await prisma.encomenda.findMany({
      include: {
        produto: true,
      },
    });

    res.status(200).json(listaDeEncomendas);
  } catch (error) {
    res.status(404).json({ mensagem: "Erro ao buscar lista de encomendas!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const buscarEncomendasPeloId = await prisma.encomenda.findUnique({
      where: { id: id },
    });

    res.status(200).json(buscarEncomendasPeloId);
  } catch (error) {
    res.status(404).json({ mensagem: "Erro ao buscar encomenda! tente novamente!" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nome,
      email,
      celular,
      endereco,
      data: dataEntrega,
      hora,
      produtoId,
    } = req.body;

    const atualizarEncomendas = await prisma.encomenda.update({
      where: { id: id },
      data: {
        nome,
        email,
        celular,
        endereco,
        data: dataEntrega,
        hora,
        produtoId,
      },
    });

    res.status(200).json(atualizarEncomendas);
  } catch (error) {
    res.status(404).json({mensagem: "Não foi possivel atualizar encomenda! tente novamente!",});
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletarEncomenda = await prisma.encomenda.delete({
      where: { id: id },
    });

    res.status(204).json(deletarEncomenda);
  } catch (error) {
    res.status(404).json({ mensagem: "Erro ao deletar encomenda! tente novamente!" });
  }
});

export default router;
