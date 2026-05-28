import exp from 'express';
import { Register,Login } from '../controller/authController.js';

const app=exp.Router();
//Register
app.post("/register",Register);

//Login
app.post("/login",Login);

export default app;