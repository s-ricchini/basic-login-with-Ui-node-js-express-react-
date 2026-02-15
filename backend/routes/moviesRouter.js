import { Router } from "express";
import { movieSchema } from '../schemas/movies.js';


//importo middleware para validar schemas
import { validateSchema } from "../middlewares/validateSchemas.js";

import movies from '../movies.json' with {type:'json'}

export const moviesRouter = Router()

//devuelve todos los movies y se le pueden apliar filtros (genre,rate,limit) -> OPCIONAL
moviesRouter.get('/', (req,res) => {
    const {genre,rate,limit} = req.query
    let peliculasFiltradas = movies;

    if (genre){
        peliculasFiltradas = peliculasFiltradas.filter(pelicula => { return pelicula.genre.includes(genre)})
    }

    if (rate){
        peliculasFiltradas = peliculasFiltradas.filter(pelicula => { return parseFloat(pelicula.rate) >= parseFloat(rate)})
    }

    if (limit){
        const searchLimit = Number(limit);

        if( !(Number.isNaN(searchLimit)) && Number.isInteger(searchLimit) && searchLimit > 0){
            peliculasFiltradas = peliculasFiltradas.slice(0,searchLimit);
        }
    }

    return res.status(200).json(peliculasFiltradas)
})


//devuelve una movie filtrando por id
moviesRouter.get('/:id',(req,res) => {

    const {id} = req.params
    const movie = movies.find(movie => {
        return movie.id === id
    })

    //si se encontro la peli devuelve
    if(movie){
        return res.status(200).json(movie)
    } else{
        return res.status(404).json({mensaje:"pelicula no encontrada"})
    }

})


//crea una nueva pelicula primero validando el schema
moviesRouter.post('/',validateSchema(movieSchema),(req,res) => {
    //si llego aca la data esta validada por el middleware

    const newMovie = {
        id: crypto.randomUUID(),
        ...req.body
    }

    movies.push(newMovie);
    return res.status(201).json(newMovie);    

})


//modifica parametros especificos de una movie encontrada por id
moviesRouter.patch("/:id",validateSchema(movieSchema,true),(req,res) => {
    //encuentro el index de la pelicula
    const {id} = req.params 

    const movieIndex = movies.findIndex(movie => movie.id == id)
    if (movieIndex === -1){
        return res.status(400).json({error: "la pelicula no fue encontrada"})
    }

    //modifico la pelicula
    const modified = {
        ...movies[movieIndex],
        ...req.body
    }

    movies[movieIndex] = modified;

    return res.status(202).json(modified);
    
})