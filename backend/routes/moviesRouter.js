import { Router } from "express";
import { movieSchema } from '../schemas/movies.js';


//importo middleware para validar schemas
import { validateSchema } from "../middlewares/validateSchemas.js";

import { MovieController } from "../controllers/movieController.js";
import { MovieModel} from "../models/movie.js";

export const moviesRouter = Router()

//devuelve todos los movies y se le pueden apliar filtros (genre,rate,limit) -> OPCIONAL
moviesRouter.get('/', MovieController.getMovies)


//devuelve una movie filtrando por id
moviesRouter.get('/:id',MovieController.getById)


//crea una nueva pelicula primero validando el schema
moviesRouter.post('/',validateSchema(movieSchema), MovieController.createMovie)


//modifica parametros especificos de una movie encontrada por id
moviesRouter.patch("/:id",validateSchema(movieSchema,true), MovieController.modifyMovie)