import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as socketio from "socket.io";
import cors from 'cors';
import { applicationRouter } from './routes/api';
import { tableData } from './helpers/Landing';

dotenv.config();

const app: Express = express();
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options));

app.use(express.json());
const port = process.env.PORT;
const host = process.env.HOST;


app.set("port", process.env.PORT || 3000);
let http = require("http").Server(app);
let io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use("/api", applicationRouter);

// throw 404 if URL not found
app.all("*", function (req, res) {
    return res.send("Page not found");
});

io.on("connection", function (socket: any) {
    console.log("user connected id: ", socket.id);

    socket.on("initial_data", async () => {

        io.sockets.emit("get_data", await tableData());

    });

    let interval = setInterval(async () => {
        io.emit('updated', await tableData());
    }, 60 * 1000);

    socket.on('disconnect', () => {
        clearInterval(interval);
        console.log('A user disconnected');
    });






});





const server = http.listen(port, function () {
    console.log(`⚡️[server]: Server is running at ${host}:${port}`);
});


