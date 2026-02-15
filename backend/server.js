import express, { json } from 'express';


//routers
import { moviesRouter } from './routes/moviesRouter.js';

const app = express();
app.disable('x-powered-by');

app.get('/', (req,res) => {
    res.json({name:"santi"})
})

app.use(json())

app.use('/movies', moviesRouter)

const PORT = 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
});


