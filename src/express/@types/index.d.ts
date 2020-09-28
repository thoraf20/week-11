import { Person } from "../../database";
declare global{
 namespace Express {
 interface Request {
 user: Person
 }
 }
}