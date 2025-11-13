import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import './index.scss'

const PerfilUsuario = () => {
    const nome = localStorage.getItem('nome');
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const navigate = useNavigate();

    function Logout() {
        toast((t) => (
            <span>
                Realmente gostaria de deslogar?
                <button onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('nome');
                    localStorage.removeItem('email');
                    toast.dismiss(t.id)
                    navigate('/user/login')
                }}>
                    SIM
                </button>
                <br /> <br /> <br />
                <button onClick={() => toast.dismiss(t.id)}>
                    Não
                </button>
            </span>
        ));

    }


    return (
        <div className='container_perfil'>
            <div className="container_usuario">
                <h1>{nome}</h1>
                <button type='button' onClick={Logout}>Logout</button>
            </div>
            <Toaster />
        </div>
    )
}

export default PerfilUsuario