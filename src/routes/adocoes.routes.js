// src/routes/adocoes.routes.js
import { Router } from 'express'
import { PedidoAdocao } from '../data/database.js'

const router = Router()

router.post('/', async (req, res) => {
    const { tutorId, animalId, status, posicao_fila } = req.body 

    try {
        const novoPedido = await PedidoAdocao.create({
            tutorId, 
            animalId,
            status: status || 'em_analise',
            posicao_fila: posicao_fila || 1,
        })

        return res.status(201).json(novoPedido)

    } catch (error) {
        console.error("Erro ao criar o pedido de adoção:", error)
        return res.status(500).json({ error: error.message || 'Erro ao fazer a adoção' })
    }
})

export default router