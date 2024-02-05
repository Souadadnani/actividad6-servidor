import executeQuery from "../../../context/postgres.connector";
import Videojuego from "../../domain/Videojuego";
import VideojuegosRepository from "../../domain/videojuegos.repository";

export default class VideojuegosRepositoryPostgreSQL implements VideojuegosRepository{

    getAll(): Promise<Videojuego[]> {
        throw new Error("Method not implemented.");
    }
    async save(videojuegos: Videojuego[]): Promise<Videojuego> {
        //const rows: any[] = await executeQuery()
        throw new Error("Method not implemented.");
    }
    addToCart(videojuego: Videojuego): Promise<Videojuego[]> {
        throw new Error("Method not implemented.");
    }
    comprar(videojuego: Videojuego): Promise<Videojuego[]> {
        throw new Error("Method not implemented.");
    }
    eliminar(id: number): Promise<Videojuego[]> {
        throw new Error("Method not implemented.");
    }

    async getVideojuegosSteam(): Promise<Videojuego[]> {
        try {
            const response = await fetch(`https://api.steampowered.com/ISteamApps/GetAppList/v2/`);
            if(response.ok){
                const videojuegos: Videojuego[] = await response.json();
                return videojuegos;
            }else{
                throw new Error(`Error en la solicitud ${response.status}`);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}