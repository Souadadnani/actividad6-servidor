import executeQuery from "../../../context/postgres.connector";
import Usuario from "../../domain/Usuario";
import UsuarioRepository from "../../domain/usuarios.repository";

export default class UsuariosRepositoryPostgreSQL implements UsuarioRepository {
    async registrar(usuario: Usuario): Promise<Usuario> {     
        console.log(usuario);
        const { nombre, password } = usuario;
        const result: any[] = await executeQuery(`insert into usuarios(nombre, password) values('${nombre}', '${password}') returning*`);
        const usuarioBD: Usuario = {
            nombre: result[0].nombre,
            password: result[0].password
        };
        return usuarioBD;
    }

    async login(usuario: Usuario): Promise<Usuario> {
        const rows: any[] = await executeQuery(`select * from usuarios where nombre='${usuario.nombre}'`);
        console.log(rows); 
        if(rows.length === 0) {
            throw new Error("Usuario o/y contraseña incorrectos");
        }else{
            const user: Usuario = {
                id: rows[0].id,
                nombre: rows[0].nombre,
                password: rows[0].password,
                compras: rows[0].compras,
                carritos: rows[0].carritos
            };
            return user;
        }    
    }
}