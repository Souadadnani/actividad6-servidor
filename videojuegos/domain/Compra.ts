import Usuario from "../../usuarios/domain/Usuario";
import Videojuego from "./Videojuego";

export default interface Compra {
    id?: number,
    usuario: Usuario,
    videojuego: Videojuego,
}