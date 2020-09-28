import bcrypt from 'bcrypt';
import express, { Request, Response, NextFunction } from 'express';
import {Person} from './database';
import {validateUser,checkUser} from './user'


const router = express();
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        const { error, value } = validateUser(req.body);
        
        console.log(value);

        if (error) {
            throw Error(error.details[0].message);
        }
        let user = await Person.findOne({ email: value.email });
        
        if (user) throw Error('Username and Email already exists');
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        //Hash the password
        value.password = await bcrypt.hash(value.password, salt);
        const newUser = new Person(value);
        await newUser.save();
        return res.status(200).json({message: `${value.email} Details successfully registered`, });
    } catch (e) {
        return res.status(400).send(e.message);
    }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        const { error, value } = checkUser(req.body);
        console.log(value);
        
        if (error) {
            return res.status(404).send(error.details[0].message);
        }
        const user: any = await Person.findOne({ email: value.email });
        if (!user) throw Error('Invalid Email  and/or Password');
        const validPassword = await bcrypt.compare(value.password, user.password);
        if (!validPassword) throw Error('Invalid email OR password');
        const token = user.assignToken();
        res.header('x-auth-token', token).status(200).json({ username: user.username, email: user.email });
    } catch (e) {
        return res.status(400).send(e.message);
    }
});
export default router;