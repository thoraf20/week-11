import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
let envPath = path.resolve(__dirname, '../', '.env');
dotenv.config({ path: envPath });


export function auth (req: Request, res: Response, next: NextFunction) {
 const token: any = req.headers['x-auth-token'];
 // const token = req.headers['']
 if (!token) return res.status(401).send('Access denied. No token given!');
 try {
 const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
 // console.log(decoded);
 req.user = decoded;
 next();
 } catch (e) {
 res.status(400).send('Invalid Token');
 }
} 