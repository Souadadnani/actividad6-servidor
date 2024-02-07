import Usuario from "../../usuarios/domain/Usuario";
import Compra from "./Compra";
import Videojuego from "./Videojuego";

export default interface VideojuegosRepository{
    getCarrito(user: Usuario): Promise<Compra[]>;
    getCompras(user: Usuario): Promise<Compra[]>;

    addToCart(carrito: Compra): Promise<Compra>;
    comprar(compra: Compra);
    eliminar(carrito: Compra): Promise<void>;
    
    save(videojuegos: Videojuego[]);
    getVideojuegosSteam();
}