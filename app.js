import express from "express";
import { PORT } from "./config/env.js"

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send("Hello World!").status(200);
})


app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

export default app;