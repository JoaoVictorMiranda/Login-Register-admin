import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import LoginUsuario from './pages/Usuario/Login';
import RegistroUsuario from './pages/Usuario/Register'
import PerfilUsuario from './pages/Usuario/Perfil';

export default function Navegar() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/user/login' element={<LoginUsuario />} />
                <Route path='/user/register' element={<RegistroUsuario />} />
                <Route path='/user/perfil' element={<PerfilUsuario />} />
            </Routes>
        </BrowserRouter>

    );
}