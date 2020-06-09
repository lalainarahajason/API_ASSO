import App from './app'
import RouteController from "./api/volunteer";

//import authController from "./api/auth";
//import errorHandler from "./middlewares/error";


const app = new App({
    port: 8080,
    controllers: [new RouteController()],
    middleWares: []
})

app.listen();