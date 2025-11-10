import { Router } from 'express'
import { Questionario } from '../data/database.js'

const router = Router()

router.post('/', async (req, res) => {
    try {
        const novoQuestionario = await Questionario.create(req.body)

        return res.status(201).json(novoQuestionario)

    } catch (error) {
        console.error("Erro ao criar questionário:", error)
        return res.status(500).json({ error: error.message || 'Erro ao salvar o questionário' })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const data = await Questionario.findByPk(id)

        if (!data) return res.status(404).json({ error: 'Questionário não foi encontrado' })
        return res.json(data)

    } catch (error) {
        console.error("Erro ao buscar questionário:", error)
        return res.status(500).json({ error: error.message || 'Erro ao buscar p questionário' })
    }
})

export default router