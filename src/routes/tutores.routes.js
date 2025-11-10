import { Router } from 'express'
import { Tutor } from '../data/database.js' 

const router = Router()

router.post('/', async (req, res) => {
    try {
        const novoTutor = await Tutor.create(req.body)
        const tutorData = novoTutor.get({ plain: true });
        delete tutorData.senha;
        return res.status(201).json(tutorData);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') { 
            return res.status(409).json({ error: 'Email ou outro campo único já cadastrado.' })
        }
        return res.status(500).json({ error: error.message || 'Erro ao criar tutor' })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const data = await Tutor.findByPk(id)

        if (!data) return res.status(404).json({ error: 'Tutor não foi encontrado' })
        
        const tutorData = data.get({ plain: true });
        delete tutorData.senha;
        return res.json(tutorData)

    } catch (error) {
        return res.status(500).json({ error: error.message || 'Erro ao buscar tutor' })
    }
})

// Atualizar tutor
router.patch('/:id', async (req, res) => {
    const { id } = req.params
    
    try {
        const [updatedRows, [updatedTutor]] = await Tutor.update(
            req.body, 
            {
                where: { id: id },
                returning: true,
            }
        )

        if (updatedRows === 0) return res.status(404).json({ error: 'Tutor não foi encontrado' })
        
        const tutorData = updatedTutor.get({ plain: true });
        delete tutorData.senha;

        return res.json({ message: `Tutor ${id} atualizado!`, tutor: tutorData })
    } catch (error) {
        return res.status(500).json({ error: error.message || 'Erro ao atualizar informação' })
    }
})

export default router