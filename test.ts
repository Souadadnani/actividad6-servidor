import test from "test";
import Usuario from "./usuarios/domain/Usuario";
import assert from "assert";
import UsuariosUseCases from "./usuarios/application/usuarios.usecases";
import UsuariosRepositoryPostgreSQL from "./usuarios/infrastructure/db/usuarios.postgres";
import VideojuegosUseCases from "./videojuegos/application/videojuegos.usecases";
import VideojuegosRepositoryPostgreSQL from "./videojuegos/infrastructure/db/videojuegos.postgres";
import Compra from "./videojuegos/domain/Compra";
import Videojuego from "./videojuegos/domain/Videojuego";

const usuariosUseCases: UsuariosUseCases = new UsuariosUseCases(new UsuariosRepositoryPostgreSQL());
const videojuegosUseCases: VideojuegosUseCases = new VideojuegosUseCases(new VideojuegosRepositoryPostgreSQL());

test('registrar', async (t) => {
    const usuario: Usuario = {
        nombre: "UserTest1",
        password: "123"
    }
    const userRegistrado = await usuariosUseCases.registrar(usuario);
    assert.strictEqual(usuario.nombre, userRegistrado.nombre);
});
 
test('login', async (t) => {
    const userARegistrar: Usuario = {
        nombre: "UserTest2",
        password: "1234"
    }
    const userRegistrado = await usuariosUseCases.registrar(userARegistrar);
    const userLogin = await usuariosUseCases.login(userARegistrar);

    assert.strictEqual(userRegistrado.id, userLogin.id);
});

test('getCarrito', async (t)=>{
    const userARegistrar: Usuario = {
        nombre: "UserTest3",
        password: "123"
    }
    const userRegistrado = await usuariosUseCases.registrar(userARegistrar);
    const userLogin = await usuariosUseCases.login(userARegistrar);
    const carrito = await videojuegosUseCases.getCarrito(userLogin);
    
    assert.strictEqual(0 , carrito.length);
});

test('getCompras', async (t)=>{
    const userARegistrar: Usuario = {
        nombre: "UserTest4",
        password: "123"
    }
    const userRegistrado = await usuariosUseCases.registrar(userARegistrar);
    const userLogin = await usuariosUseCases.login(userARegistrar);
    const compras = await videojuegosUseCases.getCompras(userLogin);
    
    assert.strictEqual(0 , compras.length);
}); 

test('addToCarrito', async (t)=>{
    const userARegistrar: Usuario = {
        nombre: "UserTest6",
        password: "123"
    }
    const userRegistrado = await usuariosUseCases.registrar(userARegistrar);
    const userLogin = await usuariosUseCases.login(userARegistrar);
    const videojuego: Videojuego = {
        nombre: "videojuegoTest2"
    }
    const videojuegos: Videojuego[] = [];
    videojuegos.push(videojuego);
    await videojuegosUseCases.save(videojuegos);
    
    const carrito: Compra = {
        usuario: userLogin,
        videojuego: videojuego
    }
    const cart = await videojuegosUseCases.addToCart(carrito);    
    assert.strictEqual(userLogin.id , cart.usuario);
});

test('comprar', async (t)=>{
    const userARegistrar: Usuario = {
        nombre: "UserTest7",
        password: "123"
    }
    const userRegistrado = await usuariosUseCases.registrar(userARegistrar);
    const userLogin = await usuariosUseCases.login(userARegistrar);
    const videojuego: Videojuego = {
        nombre: "videojuegoTest3"
    }
    const videojuegos: Videojuego[] = [];
    videojuegos.push(videojuego);
    await videojuegosUseCases.save(videojuegos);
    
    const compra: Compra = {
        usuario: userLogin,
        videojuego: videojuego,
        fechaCompra: new Date().toISOString()
    }
    await videojuegosUseCases.comprar(compra);    
    assert.strictEqual(userLogin.id , compra.usuario);
}); 

test('eliminar', async (t)=>{
    const userARegistrar: Usuario = {
        nombre: "UserTest7",
        password: "123"
    }
    const userRegistrado = await usuariosUseCases.registrar(userARegistrar);
    const userLogin = await usuariosUseCases.login(userARegistrar);
    const videojuego: Videojuego = {
        nombre: "videojuegoTest4"
    }
    const videojuegos: Videojuego[] = [];
    videojuegos.push(videojuego);
    await videojuegosUseCases.save(videojuegos);
    
    const carrito: Compra = {
        usuario: userLogin,
        videojuego: videojuego
    }
    await videojuegosUseCases.comprar(carrito);    
    assert.strictEqual(userLogin.id , carrito.usuario);
});