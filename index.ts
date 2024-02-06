import express from "express";
import dotenv from "dotenv"
import routerUsuarios from "./usuarios/infrastructure/rest/usuarios.router";
import routerVideojuegos from "./videojuegos/infrastructure/rest/vidoejuegos.router";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/usuarios", routerUsuarios);
app.use("/videojuegos", routerVideojuegos);



app.listen(port, ()=>{
    console.log(`Server is running in port ${port}`);
})

