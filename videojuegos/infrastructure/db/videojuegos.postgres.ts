import { log } from "console";
import executeQuery from "../../../context/postgres.connector";
import Usuario from "../../../usuarios/domain/Usuario";
import Compra from "../../domain/Compra";
import Videojuego from "../../domain/Videojuego";
import VideojuegosRepository from "../../domain/videojuegos.repository";
import format from 'pg-format'

export default class VideojuegosRepositoryPostgreSQL implements VideojuegosRepository{


    async getCarrito(user: Usuario): Promise<Compra[]> {
        const carritoBD: any[] = await executeQuery(`select * from compras where usuario='${user.id}' and fechaCompra is null`);
        const carritos: Compra[] = carritoBD.map(item=>{
            return {
                usuario: item.usuario,
                videojuego: item.videojuego
            }
        });
            return carritos;
    }

    async getCompras(user: Usuario): Promise<Compra[]> {
        const comprasBD: any[] = await executeQuery(`select * from compras where usuario='${user.id}' and fechaCompra is not null`);
        const compras: Compra[] = comprasBD.map(item=>{
            return {
                usuario: item.usuario,
                videojuego: item.videojuego
            }
        });
        return compras;     
    }

    async addToCart(carrito: Compra): Promise<Compra> {  
        // recuperar el id usuario desde payload y no haga falta pasarlo como parametro 
        const result: any[] = await executeQuery(`insert into compras(usuario, videojuego) values('${carrito.usuario}', '${carrito.videojuego}') returning*`);
        const carritoBD: Compra = {
            usuario: result[0].usuario,
            videojuego: result[0].videojuego,
            fechaCompra: result[0].fechaCompra
        }
        return carritoBD;
    }

    async comprar(compra: Compra) {          
        await executeQuery(`update compras set fechaCompra='${compra.fechaCompra}' where usuario='${compra.usuario}' and videojuego='${compra.videojuego}'`);
    }

    //eliminar un videojuego del carrito
    async eliminar(carrito: Compra): Promise<void> {
        await executeQuery(`delete from compras where videojuego='${carrito.videojuego}' and usuario='${carrito.usuario}' and fechaCompra is null`);
    }

    async save(videojuegos: Videojuego[]) {
        const data : any[] = [];
        for (const videojuego of videojuegos) {
            data.push([videojuego.nombre]);
        }
        await executeQuery(format(`insert into videojuegos(nombre) values %L`, data));
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