import * as repo from '../repository/usuarioRepository.js';
import { Router } from 'express';
import { generateToken } from '../utils/jwt.js';


const endpoints = Router();


endpoints.get('/usuario/validar/:email', async (req, res) => {
    const email = req.params.email;

    const info = await repo.validarEmail(email);

    if (!info) {
        res.status(200).send({ "exists": false }
        )
    } else {
        res.status(200).send({ "exists": true }
        )
    }
})



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
            usuario: usuario,
            token: token
        });
    } catch (error) {
        res.status(401).json({ mensagem: error.message });
    }
});



export default endpoints