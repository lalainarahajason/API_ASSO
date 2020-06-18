import App from './app'
import RouteController from "./api/volunteer";
import RegisterController from "./api/auth";


const app = new App({
    port: 8080,
    controllers: [new RouteController(), new RegisterController()],
    middleWares: []
})

app.listen();