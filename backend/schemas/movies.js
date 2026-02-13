const z = require('zod')

const movieSchema = z.object({
    title: z.string(),
    year: z.number().int().min(1900).max(2026),
    director: z.string(),
    duration: z.number().int().positive(),
    poster: z.url(),
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),

    )
    
})

module.exports = {movieSchema}