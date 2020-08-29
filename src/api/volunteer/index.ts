import * as express from "express";
import * as VolunteerController from "../../controllers/volunteer";
import { body } from "express-validator";

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

        /**
         * Update volunteer profile
         * /api/v1/volunteer
         */
        this.router.put('/volunteer',
            body('email').isEmail()
            , (
            req:express.Request, 
            res:express.Response, 
            next:express.NextFunction
        ) => {
            VolunteerController.updateProfile(req, res, next);
        })

    }
}

export default RouteController;