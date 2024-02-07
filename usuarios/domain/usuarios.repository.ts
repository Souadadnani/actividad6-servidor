import Usuario from "./Usuario";

export default interface UsuarioRepository {
    registrar(usuario: Usuario): Promise<Usuario>;
    login(usuario: Usuario): Promise<Usuario>;
}