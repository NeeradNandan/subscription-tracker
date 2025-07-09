import cookieParser from "cookie-parser";
import express from "express";
import { PORT } from "./config/env.js"
import connectToDB from "./database/mongodb.js";
import { arcjetMiddleware } from "./middlewares/arcjet.middleware.js";
import rootRouter from "./routes/root.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

await connectToDB();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(arcjetMiddleware);

app.use(rootRouter);

app.use(errorMiddleware);


app.get('/', (req, res) => {
	res.send("Hello World!").status(200);
})


app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

export default app;