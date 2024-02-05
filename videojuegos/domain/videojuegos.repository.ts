import Videojuego from "./Videojuego";

export default interface VideojuegosRepository{
    getAll(): Promise<Videojuego[]>,
    save(videojuegos: Videojuego[]): Promise<Videojuego>,
    addToCart(videojuego: Videojuego): Promise<Videojuego[]>,
    comprar(videojuego: Videojuego): Promise<Videojuego[]>,
    eliminar(id: number): Promise<Videojuego[]>
}