import Usuario from "../../usuarios/domain/Usuario";
import Compra from "./Compra";
import Videojuego from "./Videojuego";

export default interface VideojuegosRepository{
    getAll(): Promise<Compra[]>;
    save(videojuegos: Videojuego[]);
    addToCart(carrito: Compra): Promise<Compra>;
    comprar(compra: Compra): Promise<Compra>;
    eliminar(id: number, user: Usuario): Promise<Compra[]>;
    getVideojuegosSteam();
}