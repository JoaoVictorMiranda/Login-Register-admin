import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="container_home">
            <div className="conteudo_home">
                <h1>Bem-vindo à Nossa Plataforma</h1>
                <p>Descubra oportunidades, conecte-se e explore novas possibilidades.</p>

                <div className="botoes_home">
                    <button onClick={() => navigate('/user/login')}>Entrar</button>
                    <button onClick={() => navigate('/user/register')}>Cadastrar</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
