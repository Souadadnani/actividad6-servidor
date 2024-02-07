import Usuario from "../../usuarios/domain/Usuario";
import Compra from "../domain/Compra";
import Videojuego from "../domain/Videojuego";
import VideojuegosRepository from "../domain/videojuegos.repository";

export default class VideojuegosUseCases{
    constructor(private videojuegoRepository: VideojuegosRepository){}

    async getCarrito(user: Usuario){
        return this.videojuegoRepository.getCarrito(user);
    }
    async getCompras(user: Usuario){
        return this.videojuegoRepository.getCompras(user);
    }
    async addToCart(carrito: Compra){
        return this.videojuegoRepository.addToCart(carrito);
    }
    async comprar(compra: Compra){
        return this.videojuegoRepository.comprar(compra);
    }
    async eleminar(carrito: Compra){
        return this.videojuegoRepository.eliminar(carrito);
    } 

    async save(videojuegos: Videojuego[]){
        return this.videojuegoRepository.save(videojuegos);
    }
    async getVideojuegosSteam(){
        return this.videojuegoRepository.getVideojuegosSteam();
    }

}