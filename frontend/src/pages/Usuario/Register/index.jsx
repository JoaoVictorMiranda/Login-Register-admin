import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";


import api from '../../../api.js'
import './index.scss'

const RegistroUsuario = () => {
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    function verificarLogin() {
        const token = localStorage.getItem('token')
        if (!token) {
            return
        } else {
            toast((t) => (
                <span>
                    Ja cadastrado Seja bem vindo
                    <button onClick={() => toast.dismiss(t.id)}>
                        Ir para seu perfil
                    </button>
                </span>
            ));
            setTimeout(() => {
                navigate('/user/perfil')
            }, 4000);
        }
    }
    useEffect(() => {
        verificarLogin()
        AOS.init({
            duration: 1000, // duração da animação (ms)
            once: true,     // anima só na primeira vez que aparece
        });

    }, [token])


    async function fazerCadastro(nome, email, senha) {
        try {
            const res = await api.post('/usuarios', {
                nome: nome,
                email: email,
                senha: senha
            });
            console.log(res.data)

            try {
                const res = await api.post('/login', {
                    email: email,
                    senha: senha
                })
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('nome', res.data.usuario.nome);
                localStorage.setItem('email', res.data.usuario.email);
                console.log(res.data)
                navigate('/user/perfil')

            } catch (error) {
                console.error('Erro:' + error.message)
            }
        } catch (error) {
            console.error('Erro:' + error.message)
        }
    }


    function HandleCadastro(e) {
        e.preventDefault();


        if (senha.length <= 8) {
            toast((t) => (
                <span>
                    Senha curta demais Deve ter pelo menos 8 caracteres <br /> <br /> <b>Agradeço a compreensão</b> <br /> <br />
                    <button onClick={() => toast.dismiss(t.id)}>
                        Tentar Novamente
                    </button>
                </span>
            ));
            return
        }
        if (!nome || !email || !senha) {
            toast.error('Preencha todos os campos!');
            return;
        }

        const CadastroPromisse = fazerCadastro(nome, email, senha);

        toast.promise(CadastroPromisse, {
            loading: 'Cadastrando...',
            success: <b>Seja bem vindo! Aproveite nossas oportunidades</b>,
            error: <b>Erro no login. Verifique suas credenciais.</b>,
        },
            {
                duration: 4000,
            }
        );
    }

    return (
        <div className='container_login'>
            <div className="container_form" data-aos="fade-up">
                <h1>Cadastrar</h1>
                <form onSubmit={HandleCadastro}>
                    <input type="text" name="nome" placeholder='Nome' onChange={(e) => setNome(e.target.value)} />
                    <input type="email" name="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="senha" placeholder='Senha' onChange={(e) => setSenha(e.target.value)} />
                    <button type='submit'>cadastrar</button>
                </form>
                <p>Ja tem uma conta?  <Link to={'/user/login'}>Entrar</Link> <FaArrowLeft /> </p>
            </div>
            <Toaster />
        </div>
    )
}

export default RegistroUsuario