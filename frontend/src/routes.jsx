import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import LoginUsuario from './pages/Usuario/Login';
import RegistroUsuario from './pages/Usuario/Register'
import PerfilUsuario from './pages/Usuario/Perfil';
import RegistroAdmin from './pages/Admin/Register';
import PerfilAdmin from './pages/Admin/Perfil';
import LoginAdmin from './pages/Admin/Login';

export default function Navegar() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/user/login' element={<LoginUsuario />} />
                <Route path='/user/register' element={<RegistroUsuario />} />
                <Route path='/user/perfil' element={<PerfilUsuario />} />

                <Route path='/admin/register' element={<RegistroAdmin />}/>
                <Route path='/admin/perfil' element={<PerfilAdmin />}/>
                <Route path='/admin/login' element={<LoginAdmin />}/>
            </Routes>
        </BrowserRouter>

    );
}