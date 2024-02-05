import express from "express";
import dotenv from "dotenv"
import routerUsuarios from "./usuarios/infrastructure/rest/usuarios.router";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/usuarios", routerUsuarios);




app.listen(port, ()=>{
    console.log(`Server is running in port ${port}`);
})

