import * as express from "express";
import * as AuthController from "../../controllers/auth";
import { body } from "express-validator";
import authUser from "../../middlewares/auth";

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

        /**
         * login
         * /api/v1/login
         */
        this.router.post('/login',
            body('email').isEmail(),
            authUser,
        (
            req:express.Request, 
            res:express.Response, 
            next:express.NextFunction
        ) => {
            AuthController.login(req, res, next);
        })
    }
}

export default RouteController;