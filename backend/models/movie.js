import movies from '../movies.json' with {type:'json'};

export class MovieModel {

    static async searchMovies(genre,rate,limit){
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

        return peliculasFiltradas;
    }

    static async findById(id) {
        const movie = movies.find(movie => movie.id === id);

        if(movie){
            return movie
        }

        return null
    }

    static async newMovie(params){
        const newMov = {
            id: crypto.randomUUID(),
            ...params
        }

        movies.push(newMov);
        return newMov;

    }

    static async modifyMovie(id,params){
        
        const movieIndex = movies.findIndex(movie => movie.id == id)
        if (movieIndex === -1){
            return null
        }

        //modifico la pelicula
        const modified = {
            ...movies[movieIndex],
            ...params
        }

        movies[movieIndex] = modified;

        return modified;
    }

}