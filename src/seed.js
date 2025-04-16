// seed.js
import prisma from "./prisma/cliente.js"

async function criarProdutos() {
  await prisma.produtos.createMany({
    data: [
      {
        nome: "Ovo de Páscoa Recheado",
        imagem: "/ovo-02.png",
        price: 79.90,
        descricao: "Chocolate ao leite com brigadeiros",
        tipo: "Recheado"
      },
      {
        nome: "Ovo de Páscoa Recheado",
        imagem: "/ovo-colher.png",
        price: 79.90,
        descricao: "Chocolate ao leite com recheio de ninho",
        tipo: "Recheado"
      },

    ]
  })

  console.log("Produtos inseridos com sucesso!")
  process.exit()
}

criarProdutos()
