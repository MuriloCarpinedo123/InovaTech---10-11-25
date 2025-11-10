import { Router } from 'express'
import { Animal } from '../data/database.js'

const router = Router()

router.get('/animais', async (req, res) => {
    try {
        const data = await Animal.findAll()
        return res.json(data)
    } catch (error) {
        console.error("Erro ao listar animais (Admin):", error)
        return res.status(500).json({ error: error.message || 'Erro interno no servidor' })
    }
})

router.patch('/animais/:id', async (req, res) => {
    const { id } = req.params
    
    try {
        const [updatedRows, [updatedAnimal]] = await Animal.update(
            { ...req.body }, 
            {
                where: { id: id },
                returning: true,
            }
        )

        if (updatedRows === 0) return res.status(404).json({ error: 'Animal não foi encontrado' })

        return res.json({ message: `Animal ${id} atualizado pelo admin!`, animal: updatedAnimal })

    } catch (error) {
        console.error("Erro ao atualizar animal (Admin):", error)
        return res.status(500).json({ error: error.message || 'Erro interno no servidor' })
    }
})

router.delete('/animais/:id', async (req, res) => {
    const { id } = req.params
    
    try {
        const deletedRows = await Animal.destroy({
            where: { id: id }
        })

        if (deletedRows === 0) return res.status(404).json({ error: 'Animal não encontrado' })

        return res.json({ message: `Animal ${id} foi deletado pelo administrador!` })
    } catch (error) {
        console.error("Erro ao deletar animal (Admin):", error)
        return res.status(500).json({ error: error.message || 'Erro interno no servidor' })
    }
})

export default router