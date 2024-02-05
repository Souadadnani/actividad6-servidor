import { Request, Response } from "express";
import express, { Router } from "express";
import UsuariosUseCases from "../../application/usuarios.usecases";
import UsuariosRepositoryPostgreSQL from "../db/usuarios.postgres";
import Usuario from "../../domain/Usuario";


const usuarioUseCases: UsuariosUseCases = new UsuariosUseCases(new UsuariosRepositoryPostgreSQL());
const router = express.Router();

router.post("/registrar", async (req: Request, res: Response) => {
    const {nombre, password} = req.body;
    const usuarioAPI: Usuario ={
        nombre,
        password
    }
    const usuario = await usuarioUseCases.registrar(usuarioAPI);
    res.json({nombre: usuario.nombre});
});

router.post("/login", async (req: Request, res: Response) => {
    const {nombre, password} = req.body;
    const usuarioAPI: Usuario ={
        nombre,
        password,
    };
    const usuario = await usuarioUseCases.login(usuarioAPI);
   /*  if(usuario === null){
        res.status(400).json({mensaje: "Usuario no encontrado"});
    } */
    res.json({id: usuario.id, nombre: usuario.nombre});
});

export default router