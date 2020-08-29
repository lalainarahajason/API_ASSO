import App from './app'
import RouteController from "./api/volunteer";
import RegisterController from "./api/auth";
import originWhiteList from "./middlewares/originWhiteList";

const app = new App({
    port: 8080,
    controllers: [new RouteController(), new RegisterController()],
    middleWares: [originWhiteList]
})

app.listen();