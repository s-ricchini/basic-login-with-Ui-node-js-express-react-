import express, { json } from 'express';
import movies from './movies.json' with {type: 'json'};
import { movieSchema } from './schemas/movies.js';


const app = express();
app.disable('x-powered-by');

app.get('/', (req,res) => {
    res.json({name:"santi"})
})

app.use(json())

//todos los recusos Movies se identifican como /movies
app.get('/movies', (req,res) => {
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



    res.json(peliculasFiltradas)
})

//devuelve una movie filtrando por id
app.get('/movies/:id',(req,res) => {
    const {id} = req.params
    const movie = movies.find(movie => {
        return movie.id === id
    })

    //si se encontro la peli devuelve
    if(movie){
        res.status(200)
        res.json(movie)
    } else{
        res.status(404)
        res.json({mensaje:"pelicula no encontrada"})

    }

    
})

//middleware generico que procesa schemas, pueden hacer procesamiento parcial para patch
const validateSchema = (schema, parcial = false) => {
    return (req,res,next) => {
        const input = req.body

        let result = null;

        if(parcial){
            result = schema.partial().safeParse(input)
        } else{
            result = schema.safeParse(input)
        }

        if (!result.success){
            return res.status(400).json(result.error);
            
        }

        req.body = result.data;
        next()
    }
}


app.post('/movies',validateSchema(movieSchema),(req,res) => {
    //si llego aca la data esta validada por el middleware

    const newMovie = {
        id: crypto.randomUUID(),
        ...req.body
    }

    movies.push(newMovie);
    return res.status(201).json(newMovie);    

})

app.patch("/movies/:id",validateSchema(movieSchema,true),(req,res) => {
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

const PORT = 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
});


