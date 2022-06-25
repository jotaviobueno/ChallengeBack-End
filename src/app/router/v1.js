import express from 'express';
export const router = express.Router();

import multer from 'multer';
const upload = multer({dest: 'src/upload'});

//Controller
import registerController from '../http/controller/client/register.controller.js';
import loginController from '../http/controller/client/login.controller.js';
import registerCar from '../http/controller/car/registerCar.controller.js';
import ClientChangePassword from '../http/controller/client/ChangePassword/changePassword.controller.js';
import findCarController from '../http/controller/car/findAll.controller.js';
import saveImageController from '../http/controller/car/saveImage.controller.js';
import carRentalController from  '../http/controller/car/CarRental/rent.controller.js';
import carReturnController from '../http/controller/car/CarRental/carReturn.controller.js';

//Request
import registerRequest from '../request/client/register.request.js';
import loginRequest from '../request/client/login.request.js';
import changePasswordRequest from '../request/client/changePassword.request.js';
import findBrandRequest from '../request/car/findBrand.request.js';
import registerCarRequest from '../request/car/registerCar.request.js';
import rentCarRequest from '../request/car/rentCar.request.js';
import returnCarRequest from '../request/car/returnCar.request.js';

//Middleware
import middleware from '../http/middleware/verifyUserAndCar/verifyUserAndCar.js';

router.post('/register', registerRequest.validateRegister, registerController.registerUser);
router.post('/login', loginRequest.validateLogin, loginController.newSession);
router.post('/token', changePasswordRequest.validateGetToken, ClientChangePassword.getToken);
router.post('/change/password/:token', changePasswordRequest.validateChangePassword, ClientChangePassword.changePassword);

router.get('/find', findCarController.findByAvailable);
router.post('/find/brand', findBrandRequest.validateBrand, findCarController.findByBrand);

router.post('/car/:token', registerCarRequest.validateRegisterCar, registerCar.registerCar);
router.post('/u_id/:token/c_id/:id', middleware.verifyUser, upload.single('file'), saveImageController.saveIMG);
router.post('/rent/u_id/:token/c_id/:id', rentCarRequest.validateReturnCar ,carRentalController.rentCar);
router.post('/car/rent/u_id/:token/c_id/:id', returnCarRequest.validateReturnCar, carReturnController.returnCar);