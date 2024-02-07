import Usuario from "../../usuarios/domain/Usuario";
import Compra from "./Compra";
import Videojuego from "./Videojuego";

export default interface VideojuegosRepository{
    getCarrito(carrito: Compra): Promise<Compra[]>;
    getCompras(compra: Compra): Promise<Compra[]>;
    addToCart(carrito: Compra): Promise<Compra>;
    comprar(compra: Compra): Promise<Compra>;
    eliminar(carrito: Compra): Promise<Compra[]>;
    save(videojuegos: Videojuego[]);
    getVideojuegosSteam();
}