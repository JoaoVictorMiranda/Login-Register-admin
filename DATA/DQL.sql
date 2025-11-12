-- 1. Listar todos os usuários
SELECT 
    usuarios.id, 
    usuarios.nome, 
    usuarios.email, 
    usuarios.criado_em
FROM usuarios;


-- 2. Listar todos os administradores
SELECT 
    administradores.id, 
    administradores.nome, 
    administradores.email, 
    administradores.criado_em, 
    administradores.isadmin
FROM administradores;


-- 3. Mostrar todos os posts dos usuários (com nome do autor)
SELECT 
    post_usuario.id AS id_post,
    usuarios.nome AS nome_usuario,
    post_usuario.comentario,
    post_usuario.criado_em
FROM post_usuario
JOIN usuarios ON post_usuario.id_usuario = usuarios.id
ORDER BY post_usuario.criado_em DESC;


-- 4. Mostrar todos os anúncios dos administradores (com nome do admin)
SELECT 
    anuncio_admin.id AS id_anuncio,
    administradores.nome AS nome_admin,
    anuncio_admin.comentario,
    anuncio_admin.criado_em
FROM anuncio_admin
JOIN administradores ON anuncio_admin.id_admin = administradores.id
ORDER BY anuncio_admin.criado_em DESC;


-- 5. Buscar um usuário específico por e-mail (para login, por exemplo)
SELECT 
    usuarios.id, 
    usuarios.nome, 
    usuarios.email, 
    usuarios.senha
FROM usuarios
WHERE usuarios.email = ?;


-- 6. Buscar todos os posts de um usuário específico
SELECT 
    post_usuario.id,
    post_usuario.comentario,
    post_usuario.criado_em
FROM post_usuario
WHERE post_usuario.id_usuario = ?;


-- 7. Buscar todos os anúncios de um administrador específico
SELECT 
    anuncio_admin.id,
    anuncio_admin.comentario,
    anuncio_admin.criado_em
FROM anuncio_admin
WHERE anuncio_admin.id_admin = ?;
