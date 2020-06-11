import * as express from "express";
import * as AuthController from "../../services/auth"

class RouteController {
    public router = express.Router();
    
    constructor() {
        this.initRoutes();
    }

    public initRoutes(){

        /**
         * Register a volunteer
         * /api/v1/volunteers
         */
        this.router.post('/volunteer', (
            req:express.Request, 
            res:express.Response, 
            next:express.NextFunction
        ) => {
            AuthController.registerVolunteer(req, res, next);
        })

    }
}

export default RouteController;