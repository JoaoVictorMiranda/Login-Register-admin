import express from 'express';
import { getAuthentication, generateToken } from '../utils/jwt.js'
import { apenasAdmin } from '../utils/admin.js';
import * as repo from '../repository/adminRepository.js'
import bcrypt from 'bcrypt';

const endpoints = express.Router();
const auth = getAuthentication();

endpoints.post('/admin/cadastrar', async (req, res) => {
    try {
        const dados = req.body;

        const id = await repo.inserirAdmin(dados);
        res.status(201).json({ message: 'Administrador cadastrado com sucesso!', id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao cadastrar administrador.' });
    }
});


endpoints.post('/admin/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        const admin = await repo.entrarAdmin(email);

        if (!admin)
            return res.status(404).json({ message: 'Administrador não encontrado' });

        const senhaCorreta = await bcrypt.compare(senha, admin.senha);

        if (!senhaCorreta)
            return res.status(401).json({ message: 'Senha incorreta' });

        //Continua removendo a senha para evitar que de merda
        const { senha: _, ...adminSemSenha } = admin;

        const token = generateToken({ ...adminSemSenha, tipo: 'admin' });

        res.json({
            token,
            admin: adminSemSenha
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao fazer login do administrador.' });
    }
});


endpoints.get('/admin/usuarios', auth, apenasAdmin, async (req, res) => {
    const usuarios = await repo.listarUsuarios();
    res.json(usuarios);
});


endpoints.delete('/admin/usuarios/:id', auth, apenasAdmin, async (req, res) => {
    const { id } = req.params;
    await repo.deletarUsuario(id);
    res.json({ message: 'Usuário apagado com sucesso!' });
});

export default endpoints;