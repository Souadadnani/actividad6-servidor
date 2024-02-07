import Usuario from "../../usuarios/domain/Usuario";
import Videojuego from "./Videojuego";

export default interface Compra {
    usuario: Usuario,
    videojuego: Videojuego,
    fechaCompra?:  string;
}