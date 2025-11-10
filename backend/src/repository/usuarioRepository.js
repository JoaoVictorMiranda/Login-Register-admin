import { connection } from './connection.js'
import bcrypt from 'bcrypt';
const tileCount = 12;


export async function criarUsuario(dados) {
    const comando = `
        INSERT INTO usuarios(nome, email, senha, nascimento, criado_em)
        VALUES
        (?,?,?,?, NOW());
    `;

    try {
        const hash = await bcrypt.hash(dados.senha, tileCount); // define 10 rounds por padrão

        const [registro] = await connection.query(comando, [
            dados.nome,
            dados.email,
            hash,
            dados.nascimento
        ]);

        return registro.insertId; // retorna o ID do novo usuário
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw new Error("Não foi possível cadastrar o usuário.");
    }
};


export async function entrarUsuario(email, senha) {
    const comandoBuscar = `
    SELECT id, nome, email, senha, nascimento 
    FROM usuarios 
    WHERE email = ?`;

    let [info] = await connection.query(comandoBuscar, [email]);
    if (info.length === 0) {
        throw new Error('Credenciais inválidas')
    }
    const usuario = info[0]

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if (!senhaCorreta) {
        throw new Error('Credenciais inválidas')
    }

    //Retira a senha antes de dar return para evitar mandar a senha de volta
    const { senha: _, ...usuarioSemSenha } = usuario

    return usuarioSemSenha

}