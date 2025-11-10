import usuarioController from './controller/usuarioController.js'
import adminController from './controller/adminController.js'


export default function navegar(api) {
    api.use(usuarioController);
    api.use(adminController);

}