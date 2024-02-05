import Videojuego from "../domain/Videojuego";
import VideojuegosRepository from "../domain/videojuegos.repository";

export default class VideojuegosUseCases{
    constructor(private videojuegoRepository: VideojuegosRepository){}

    async getAll(){
        return this.videojuegoRepository.getAll();
    }
    async save(videojuegos: Videojuego[]){
        return this.videojuegoRepository.save(videojuegos);
    }
    async addToCart(videojuego: Videojuego){
        return this.videojuegoRepository.addToCart(videojuego);
    }
    async comprar(videojuego: Videojuego){
        return this.videojuegoRepository.comprar(videojuego);
    }
    async eleminar(id: number){
        return this.videojuegoRepository.eliminar(id);
    } 

}