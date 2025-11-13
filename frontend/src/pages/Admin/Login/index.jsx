import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";


import api from '../../../api.js'
import './index.scss'

const LoginAdmin = () => {
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
                navigate('/admin/perfil')
            }, 4000);
        }
    }
    useEffect(() => {
        verificarLogin()
        AOS.init({
            duration: 1000, 
            once: true,     
        });

    }, [token])

    async function fazerLogin(email, senha) {
        try {
            const res = await api.post('/admin/login', {
                email: email,
                senha: senha
            })
            localStorage.setItem('token-admin', res.data.token);
            localStorage.setItem('nome', res.data.admin.nome);
            localStorage.setItem('email', res.data.admin.email);
            console.log(res.data)
            navigate('/admin/perfil')

        } catch (error) {
            console.error('Erro:' + error.message);
            if (res.status === 401) {
                return false
            }
        }
    }


    function HandleLogin(e) {
        e.preventDefault();



        if (!email || !senha) {
            toast.error('Preencha todos os campos!');
            return;
        }

        const loginPromise = fazerLogin(email, senha);

        toast.promise(loginPromise, {
            loading: 'Entrando...',
            success: <b>Seja bem vindo!</b>,
            error: <b>Erro no login. Verifique suas credenciais.</b>,
        },
            {
                duration: 4000,
            }
        );
    }

    return (
        <div className='container_login' >
            <div className="container_form" data-aos="fade-down">
                <h1>ENTRAR / ADMINISTRADOR</h1>
                <form onSubmit={HandleLogin}>
                    <input type="email" name="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="senha" placeholder='Senha' onChange={(e) => setSenha(e.target.value)} />
                    <button type='submit'>Entrar</button>
                </form>
                <p>Não tem conta crie a sua <Link to={'/admin/Register'}>Aqui</Link> <FaArrowLeft /> </p>
            </div>
            <Toaster />
        </div>
    )
}

export default LoginAdmin