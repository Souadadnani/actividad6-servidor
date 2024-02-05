import Videojuego from "../../videojuegos/domain/Videojuego";

export default interface Usuario {
    id?: number,
    nombre: string,
    password: string,
    compras?: Array<Videojuego>,
    carritos?: Array<Videojuego>
}