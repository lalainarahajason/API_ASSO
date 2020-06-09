import App from './app'
//import routeController from "./routes/volontaires";
//import authController from "./routes/auth";
//import errorHandler from "./middlewares/error";
//import connectDB from "./config/db";
connectDB();
const app = new App({
    port: 8080,
    controllers: [ new routeController(), new authController() ],
    middleWares: [errorHandler]
})

app.listen();