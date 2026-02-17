import { MovieModel } from "../models/movie.js";


export class MovieController{

    //devuelve todos los movies y se le pueden apliar filtros (genre,rate,limit) -> OPCIONAL
    static async getMovies(req,res) {
        const {genre,rate,limit} = req.query
        const peliculasFiltradas = await MovieModel.searchMovies(genre,rate,limit);
        return res.status(200).json(peliculasFiltradas)
    }

    //devuelve una movie filtrando por id
    static async getById(req,res){
        const {id} = req.params
        const movie = await MovieModel.findById(id)
    
        //si se encontro la peli devuelve
         if(movie){
            return res.status(200).json(movie)
        } else{
            return res.status(404).json({mensaje:"pelicula no encontrada"})
        }
    
    }

    //crea una nueva pelicula
    static async createMovie(req,res) {
        //si llego aca la data esta validada por el middleware
        const params = req.body;
        
        const newMov = await MovieModel.newMovie(params);
        return res.status(201).json(newMov);    

    }

    
    //modifica parametros especificos de una movie encontrada por id
    static async modifyMovie(req,res){

        //encuentro el index de la pelicula
         const {id} = req.params 

        const modified = await MovieModel.modifyMovie(id,req.body)
        if (!modified){
            return res.status(400).json({error: "la pelicula no fue encontrada"})
        }

        return res.status(202).json(modified);
    
    }





}