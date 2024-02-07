import test from "test";
import Usuario from "./usuarios/domain/Usuario";
import assert from "assert";
import UsuariosUseCases from "./usuarios/application/usuarios.usecases";
import UsuariosRepositoryPostgreSQL from "./usuarios/infrastructure/db/usuarios.postgres";

const usuariosUseCases: UsuariosUseCases = new UsuariosUseCases(new UsuariosRepositoryPostgreSQL());

test('registrar', async (t) => {
    const usuario: Usuario = {
        nombre: "UserTest",
        password: "123"
    }
    const userRegistrado = await usuariosUseCases.registrar(usuario);
    assert.strictEqual(usuario.nombre, userRegistrado.nombre);
});
 
test('login', async (t) => {
    const userARegistrar: Usuario = {
        nombre: "User1",
        password: "1234"
    }
    const userRegistrado = await usuariosUseCases.registrar(userARegistrar);
    const userLogin = await usuariosUseCases.login(userARegistrar);

    assert.strictEqual(userRegistrado.id, userLogin.id);
});

test('getCarrito', async (t)=>{
    
})


