const express = require('express');
const movies = require('./movies.json')


const app = express();
app.disable('x-powered-by');

app.get('/', (req,res) => {
    res.json({name:"santi"})
})


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

const PORT = 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
});


