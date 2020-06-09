// The app server
const dotenv = require('dotenv');

dotenv.config({ path: './env/.env', debug: process.env.DEBUG });
//import connectDB from "./config/db";
import express, { Application } from "express"

console.log(process.env.MONGO_URI)


interface KM {
    port: number; 
    app: Application; 
}

class App implements KM{
    
    public app: Application;
    public port: number;
    
    constructor(appInit : { port:number, middleWares:any, controllers:any }) {

        this.app    = express();
        this.port   = appInit.port;
        this.middlewares(appInit.middleWares);
        this.app.use(express.json())
        this.routes(appInit.controllers);
       
    }

    private middlewares(middleWares:{ forEach: (arg0:(middleWare:any) => void)=>void}){
        middleWares.forEach( middleware => {
            this.app.use(middleware)
        })
        
    }

    private routes(controllers:{ forEach:(arg0:(controller:any)=>void)=>void }){
        controllers.forEach(controller => {
            this.app.use("/api/v1/", controller.router)
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}

export default App;
