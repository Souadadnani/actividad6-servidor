import express from "express";
import { Request, Response } from "express";
import VideojuegosUseCases from "../../application/videojuegos.usecases";
import VideojuegosRepositoryPostgreSQL from "../db/videojuegos.postgres";
import Videojuego from "../../domain/Videojuego";

const router = express();
const videojuegosUseCases: VideojuegosUseCases = new VideojuegosUseCases(new VideojuegosRepositoryPostgreSQL());

router.get("/", async (req: Request, res: Response) => {
    const videojuegos = await videojuegosUseCases.getVideojuegosSteam();
    res.json(videojuegos);
});

router.post("/carrito/videojuego", async (req: Request, res: Response)=>{
    
})


export default router;