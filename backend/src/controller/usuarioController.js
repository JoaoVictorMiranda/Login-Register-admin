import * as repo from '../repository/usuarioRepository.js';
import { Router } from 'express';
import { generateToken } from '../utils/jwt.js';


const endpoints = Router();

endpoints.post('/usuarios', async (req, res) => {
    const dados = req.body;

    const registro = await repo.criarUsuario(dados)
    res.send({
        registro: registro
    })
})


endpoints.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const senha = req.body.senha;

        const usuario = await repo.entrarUsuario(email, senha);
        const token = generateToken(usuario)
        res.status(200).json({
            token: token
        });
    } catch (error) {
        res.status(401).json({ mensagem: error.message });
    }
});



export default endpoints