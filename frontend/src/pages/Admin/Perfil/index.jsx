import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import './index.scss'
import apiAdmin from '../../../apiadmin.js';



const PerfilAdmin = () => {
    const nome = localStorage.getItem('nome');
    const token = localStorage.getItem('token-admin');
    const email = localStorage.getItem('email');
    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState([]);



    async function carregarUsuarios(){
        try {
            const res = await apiAdmin.get('/admin/usuarios');
            console.log(res.data);
            setUsuarios(res.data.usuarios);
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
            setUsuarios([]);
        }
    }

    useEffect(() => {
      carregarUsuarios();
    

    }, [])
    
    
    
    
    function Logout() {
        toast((t) => (
            <span>
                Realmente gostaria de deslogar?
                <button onClick={() => {
                    localStorage.removeItem('token-admin');
                    localStorage.removeItem('nome');
                    localStorage.removeItem('email');
                    toast.dismiss(t.id)
                    navigate('/admin/login')
                }}>
                    SIM
                </button>
                <br /> <br /> <br   />
                <button onClick={() => toast.dismiss(t.id)}>
                    Não
                </button>
            </span>
        ));

    }


    return (
        <div className='container_perfil'>
            <div className="container_usuario">
                <h1>ADMINISTRADOR</h1>
                <h2>{nome}</h2>
                <button type='button' onClick={Logout}>Logout</button>
            </div>

            <div className='container_usuarios'>
            {usuarios.map((usuario) => (
                <div className='container_listar_usuarios' key={usuario.id} >
                                <p>{usuario.id}</p>
                                  <h2>{usuario.nome}</h2>
      
                </div>
                ))}

            </div>
            <Toaster />
        </div>
    )
}

export default PerfilAdmin