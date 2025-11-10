
import { Tutor } from '../data/database.js'
import { v4 as uuid } from 'uuid'
import { Op } from 'sequelize' 


const register = async (req, res) => {
    const { nome_completo, senha, email, cidade, estado, idade, telefone, instagram, facebook } = req.body

    try {
        const novoTutor = await Tutor.create({
            id: uuid(), nome_completo, senha, email, cidade, estado, idade, telefone, instagram, facebook,
        })

        const tutorData = novoTutor.get({ plain: true })
        delete tutorData.senha 

        return res.status(201).json(tutorData)

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') { 
            return res.status(409).json({ error: 'Email ou outro campo único já cadastrado.' })
        }
        console.error("Erro no registro:", error);
        return res.status(500).json({ error: error.message || 'Erro interno no servidor' })
    }
}


const login = async (req, res) => {
    const { email, senha } = req.body
    
    try {
        const tutor = await Tutor.findOne({
            where: {
                email: email,
                senha: senha 
            }
        })
        
        if (!tutor) {
            return res.status(401).json({ error: 'Credenciais inválidas' })
        }
        
        const tutorData = tutor.get({ plain: true })
        delete tutorData.senha 

        return res.json({ message: 'Login realizado com sucesso!', tutor: tutorData })

    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ error: error.message || 'Erro interno no servidor' })
    }
}

export default {
    register,
    login
}