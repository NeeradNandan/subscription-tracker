import express from "express";
import { PORT } from "./config/env.js"
import connectToDB from "./database/mongodb.js";
import rootRouter from "./routes/root.routes.js";

const app = express();

await connectToDB();

app.use(express.json());

app.use(rootRouter);


app.get('/', (req, res) => {
	res.send("Hello World!").status(200);
})


app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

export default app;