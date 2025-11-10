import { Router } from 'express'
import { Doacao } from '../data/database.js' 

const router = Router()


router.post('/', async (req, res) => {
    const { nome, email, valor, mensagem, linkPix, qrcode } = req.body

    try {
        const novaDoacao = await Doacao.create({
            nome, email, valor, mensagem, linkPix, qrcode
        })

        return res.status(201).json(novaDoacao)

    } catch (error) {
        console.error("Erro ao criar doação:", error)
        return res.status(500).json({ error: error.message || 'Erro ao fazer a Doação.' })
    }
})

export default router