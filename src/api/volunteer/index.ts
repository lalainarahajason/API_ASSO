import * as express from "express";
import * as VolunteerController from "../../services/volunteer"

class RouteController {
    public router = express.Router();
    
    constructor() {
        this.initRoutes();
    }

    public initRoutes(){

        /**
         * Find all volunteers
         * /api/v1/volunteers
         */
        this.router.get('/volunteers', (
            req:express.Request, 
            res:express.Response, 
            next:express.NextFunction
        ) => {
            VolunteerController.findAll(req, res, next);
        })

    }
}

export default RouteController;