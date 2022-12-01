import cors from "cors";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { UserController } from "./resources/user/user.controller";
import { ExceptionsHandler } from "./middlewares/exceptions.handler";
import { UnknownRoutesHandler } from "./middlewares/unknownRoutes.handler";

dotenv.config();
const app = express()
app.use(express.json())

let corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

/**
 * Toutes les routes CRUD pour les animaux seronts préfixées par `/pets`
 */
app.use('/user', UserController)

/**
 * Homepage (uniquement necessaire pour cette demo)
 */
app.get('/', (req, res) => res.send('🏠'))

/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
app.all('*', UnknownRoutesHandler)

/**
 * Gestion des erreurs
 * /!\ Cela doit être le dernier `app.use`
 */
app.use(ExceptionsHandler)

/**
 * On demande à Express d'ecouter les requêtes sur le port défini dans la config
 */
app.listen(process.env.PORT, () => console.log('Listening.'))