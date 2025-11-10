import { Router } from 'express'
import { Animal } from '../data/database.js' 
import { Op } from 'sequelize'

const router = Router()

router.post('/', async (req, res) => {
    const { nome, especie, porte, castrado, vacinado, descricao, foto, adotado } = req.body

    try {
        const novoAnimal = await Animal.create({
            nome, especie, porte, castrado, vacinado, descricao, foto, adotado: adotado || false
        })
        return res.status(201).json(novoAnimal)

    } catch (error) {
        console.error("Erro ao cadastrar o animal:", error)
        return res.status(500).json({ error: error.message || 'Erro ao cadastrar o animal' })
    }
})

router.get('/', async (req, res) => {
    const { nome, especie } = req.query
    const where = {}

    if (nome) {
        where.nome = { [Op.like]: `%${nome}%` } 
    }
    if (especie) {
        where.especie = especie 
    }

    try {
        const data = await Animal.findAll({ where: where })
        return res.json({ data, total: data.length })
    } catch (error) {
        console.error("Erro ao buscar animais:", error)
        return res.status(500).json({ error: error.message || 'Erro ao buscar animais' })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const data = await Animal.findByPk(id) 

        if (!data) return res.status(404).json({ error: 'Animal não foi encontrado.' })
        return res.json(data)
    } catch (error) {
        console.error("Erro ao buscar animal:", error)
        return res.status(500).json({ error: error.message || 'Erro ao buscar o animal.' })
    }
})

export default router