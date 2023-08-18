
// app.js
import express from 'express';
import movieRoutes from './routes/movieRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(movieRoutes);

app.listen(port, () => console.log(`Server listening at port ${port}`));

export default app;