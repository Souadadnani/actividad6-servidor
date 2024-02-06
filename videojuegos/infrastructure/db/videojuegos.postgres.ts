import executeQuery from "../../../context/postgres.connector";
import Videojuego from "../../domain/Videojuego";
import VideojuegosRepository from "../../domain/videojuegos.repository";
import format from 'pg-format'

export default class VideojuegosRepositoryPostgreSQL implements VideojuegosRepository{

    getAll(): Promise<Videojuego[]> {
        throw new Error("Method not implemented.");
    }

    async save(videojuegos: Videojuego[]) {
        const data : any[] = [];
        for (const videojuego of videojuegos) {
            data.push([videojuego.nombre]);
        }
        await executeQuery(format(`insert into videojuegos(nombre) values %L`, data));
    }

    async addToCart(videojuego: Videojuego): Promise<Videojuego[]> {
        const videojuegos = await executeQuery(`insert into compras(id, usuario, vi) `)
        throw new Error("Method not implemented.");
    }
    comprar(videojuego: Videojuego): Promise<Videojuego[]> {
        throw new Error("Method not implemented.");
    }
    eliminar(id: number): Promise<Videojuego[]> {
        throw new Error("Method not implemented.");
    }

    async getVideojuegosSteam() {
        try {
            const response = await fetch(`https://api.steampowered.com/ISteamApps/GetAppList/v2/`);
            if(response.ok){
                const result : any= await response.json();
                const data : any[] = result.applist.apps; 
                const videojuegos: Videojuego[] = [];               
                for(const item of data){
                    const videojuego: Videojuego ={
                        nombre: item.name || " "
                    }
                    videojuegos.push(videojuego);
                }
                this.save(videojuegos);
            }else{
                throw new Error(`Error en la solicitud ${response.status}`);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}