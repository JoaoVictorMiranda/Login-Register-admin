import { connection } from './connection.js';
import bcrypt from 'bcrypt';
const tileCount = 12;

// INSERIR ADMINISTRADOR
export async function inserirAdmin(dados) {
    const comando = `
    INSERT INTO administradores (nome, email, senha, nascimento, criado_em)
    VALUES (?, ?, ?, ?, NOW());
  `;

    const hash = await bcrypt.hash(dados.senha, tileCount);

    const [resposta] = await connection.query(comando, [
        dados.nome,
        dados.email,
        hash,
        dados.nascimento
    ]);

    return resposta.insertId;
}


export async function entrarAdmin(email) {
    const comando = `
    SELECT * FROM administradores
    WHERE email = ?;
  `;
    const [rows] = await connection.query(comando, [email]);

    return rows[0];
}




export async function listarUsuarios() {
    const comando = `
    SELECT id, nome, email, nascimento 
    FROM usuarios;
    `;
    const [registro] = await connection.query(comando);
    return registro
}

export async function deletarUsuario(id) {
    const comando = `
        DELETE FROM usuarios WHERE id = ?
    `;
    const [registro] = await connection.query(comando, [id]);

    return registro.affectedRows
}


