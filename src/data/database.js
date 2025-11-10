
import { Sequelize, DataTypes } from 'sequelize';
import AnimalModel from '../models/Animal.js';
import TutorModel from '../models/Usuario.js'; 
import PedidoAdocaoModel from '../models/PedidoAdocao.js';
import QuestionarioModel from '../models/Questionario.js';
import DoacaoModel from '../models/Doacao.js';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', 
    logging: false, 
});

export const Animal = AnimalModel(sequelize);
export const Tutor = TutorModel(sequelize); 
export const PedidoAdocao = PedidoAdocaoModel(sequelize);
export const Questionario = QuestionarioModel(sequelize);
export const Doacao = DoacaoModel(sequelize);


Tutor.hasMany(PedidoAdocao, { foreignKey: 'tutorId', as: 'pedidos' });
PedidoAdocao.belongsTo(Tutor, { foreignKey: 'tutorId', as: 'tutor' });

Animal.hasMany(PedidoAdocao, { foreignKey: 'animalId', as: 'pedidos' });
PedidoAdocao.belongsTo(Animal, { foreignKey: 'animalId', as: 'animal' });


Tutor.hasOne(Questionario, { foreignKey: 'tutorId', as: 'questionario' });
Questionario.belongsTo(Tutor, { foreignKey: 'tutorId', as: 'tutor' });



const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexão com SQLite estabelecida com sucesso.');
        await sequelize.sync({ alter: true }); 
        console.log('✅ Modelos sincronizados com o banco de dados.');
    } catch (error) {
        console.error('❌ Não foi possível conectar/sincronizar com o banco de dados:', error);
    }
}

initializeDatabase();

export default { sequelize, Animal, Tutor, PedidoAdocao, Questionario, Doacao };