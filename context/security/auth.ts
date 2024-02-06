import jwt, { Secret } from "jsonwebtoken";
import Usuario from "../../usuarios/domain/Usuario";
import { NextFunction, Request, Response } from "express";

//clave secreta para firmar y verificar los tokens
const SECRET_KEY: Secret = "mykey";

//decodifica el token y me devuelve el payload
const decode = (token: string)=>{
    return jwt.decode(token);
}

//crear el token
const createToken = (usuario: Usuario): string =>{
    const payload = {id: usuario.id};
    return jwt.sign(payload, SECRET_KEY, {expiresIn: "1 days"});
}

const isAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers["authorization"];
        const token: string | undefined = authHeader && authHeader.split(" ")[1];
        if(token){
            //verificar si el token es valido usando la clave de firma
            const decoded: any = jwt.verify(token, SECRET_KEY);
            console.log(decoded);
            
            req.body.id = decoded.id;
            next();
        }else{
            res.status(401).json({mensaje: "No autorizado"});
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({mensaje: "No autorizado"});
    }
}

export {decode, createToken, isAuth}

/* authHeader && authHeader.split(" ")[1]; esto es algo parecedo a:
if(authHeader){
    authHeader.split(" ")[1];
} */