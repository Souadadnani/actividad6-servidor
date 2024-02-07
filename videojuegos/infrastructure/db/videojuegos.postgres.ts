import executeQuery from "../../../context/postgres.connector";
import Usuario from "../../../usuarios/domain/Usuario";
import Compra from "../../domain/Compra";
import Videojuego from "../../domain/Videojuego";
import VideojuegosRepository from "../../domain/videojuegos.repository";
import format from 'pg-format'

export default class VideojuegosRepositoryPostgreSQL implements VideojuegosRepository{


    async getCarrito(carrito: Compra): Promise<Compra[]> {
        const carritos: Compra[] = [];
        const carritoBD: any[] = await executeQuery(`select * from compras where comprado='${carrito.comprado=false}' and usuario='${carrito.usuario}'`);
        if(carritoBD){
           /*  id: carritoBD[0].id,
            usuario: carritoBD[0].usuario,
             */
        }
        throw new Error("Method not implemented.");
    }

    async addToCart(carrito: Compra): Promise<Compra> {  
        // le podemos coger el id usario del payload sin falta pasarlo como parametro 
        const {usuario, videojuego} = carrito;
        const result: any[] = await executeQuery(`insert into compras(usuario, videojuego) vlaues('${usuario.id}', '${videojuego.id}') returning*`);
        const carritoBD: Compra = {
            id: result[0].id,
            usuario: result[0].usuario,
            videojuego: result[0].videojuego,
            comprado: result[0].comprado
        }
        return carritoBD;
    }

    async comprar(compra: Compra): Promise<Compra> {
         //para hacer la compra pasar el id videojuego y el id usuario
         // le podemos cogir el id usario del payload sin falta pasarlo como parametro           
            const result= await executeQuery(`update compras set comprado='${compra.comprado=true}' where id='${compra.id}')`);
            console.log(result);
            const carritoBD: Compra = {
                id: result[0].id,
                usuario: result[0].usuario,
                videojuego: result[0].videojuego,
                comprado: result[0].comprado
        }
        return carritoBD;
    }

    async eliminar(carrito: Compra): Promise<Compra[]> {
        const result = await executeQuery(`delete from compras where id='${carrito.id} and comprado='${carrito.comprado=false}''`);
        console.log(result);
        
        throw new Error("Method not implemented.");
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