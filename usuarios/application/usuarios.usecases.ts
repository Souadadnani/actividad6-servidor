import { compare, hash } from "../../context/security/encrypter";
import Usuario from "../domain/Usuario";
import UsuarioRepository from "../domain/usuarios.repository";

export default class UsuariosUseCases {

    constructor(private usuarioRepository: UsuarioRepository){
    }

    async registrar(usuario: Usuario){
        const userToSave : Usuario = {
            nombre: usuario.nombre,
            password: ""
        }
        if(!usuario.password) throw new Error("Falta password");
        const cifrada = hash(usuario.password);
        userToSave.password = cifrada;
        return this.usuarioRepository.registrar(userToSave);
    }

    async login(usuario: Usuario){
        if(!usuario.password) throw new Error("Falta password");
        const usuarioBD = await this.usuarioRepository.login(usuario);
        if(!usuarioBD) throw new Error("Usuario no esta registrado");
        const iguales = compare(usuario.password, usuarioBD.password);
        if(iguales){
            return usuarioBD;
        }else{
            throw new Error("Usuario/Contraseña no es correcto");
        }
    }


}