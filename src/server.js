import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import produtosRouter from "./routes/produtos.js"
import encomendasRouter from "./routes/encomendas.js"
import adminRoutes from "./routes/admin.routes.js"

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use(express.static("public"))


app.use("/api/pascoa", produtosRouter)
app.use("/api/encomendas", encomendasRouter)
app.use("/admin", adminRoutes)

app.get("/", (req,res)=>{
  res.send("Api de Páscoa Funcionando!🐰🍫🐰🍫")
})

app.listen(3001, ()=>{
    console.log("Servidor em execução na porta http://localhost:3001")
})