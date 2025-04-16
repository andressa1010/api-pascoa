import { z } from "zod"

export const esquemaEncomenda = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  celular: z.string().min(8),
  endereco: z.string().min(1),
  data: z.string().min(1),
  hora: z.string().min(1),
  produtoId: z.string()
})


