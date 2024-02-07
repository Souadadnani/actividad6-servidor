import express from "express";
import { Request, Response } from "express";
import VideojuegosUseCases from "../../application/videojuegos.usecases";
import VideojuegosRepositoryPostgreSQL from "../db/videojuegos.postgres";
import Videojuego from "../../domain/Videojuego";
import {isAuth} from "../../../context/security/auth";
import Usuario from "../../../usuarios/domain/Usuario";
import Compra from "../../domain/Compra";

const router = express();
const videojuegosUseCases: VideojuegosUseCases = new VideojuegosUseCases(new VideojuegosRepositoryPostgreSQL());

router.get("/", async (req: Request, res: Response) => {
    const videojuegos = await videojuegosUseCases.getVideojuegosSteam();
    res.json(videojuegos);
});

router.get("/carrito", isAuth, async (req:Request, res:Response)=>{
    const user: Usuario = {
        id: req.body.user
    }
    const carrito = await videojuegosUseCases.getCarrito(user);
    res.json(carrito);
});

router.get("/compras", isAuth, async (req:Request, res:Response)=>{
    const user: Usuario = {
        id: req.body.user
    }
    const compras = await videojuegosUseCases.getCompras(user);
    res.json(compras);
});

router.post("/carrito/videojuego", isAuth, async (req: Request, res: Response)=>{
    const carritoAPI: Compra = {
        usuario: req.body.user,
        videojuego: req.body.id
    }
    const carrito = await videojuegosUseCases.addToCart(carritoAPI)
    res.json(carrito);
});

router.put("/comprar/videojuego", isAuth, async (req: Request, res: Response)=>{
    /* const fechaActual = new Date(); */
    const compraAPI: Compra = {
        usuario: req.body.user,
        videojuego: req.body.id,
        fechaCompra: new Date().toISOString()
    }
    await videojuegosUseCases.comprar(compraAPI);
    res.json("Videojuego comprado");  
});

router.delete("/carrito/eliminar/videojuego", isAuth, async (req: Request, res: Response)=>{
    const carritoAPI: Compra = {
        usuario: req.body.user,
        videojuego: req.body.id,
    } 
    await videojuegosUseCases.eleminar(carritoAPI);
    res.send("videojuego eliminado del carrito");
});

export default router;