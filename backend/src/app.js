import express from 'express';
import cors from 'cors';

import navegar from './rotas.js';


const api = express();
api.use(express.json());
api.use(cors());


navegar(api)



const PORT = 5022;
api.listen(PORT, () => console.log(`Subiu na porta ---- ${PORT}`))

