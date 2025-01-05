import { Address } from "./Address";
import { Image } from "./Image";
import { Name } from "./Name";

export interface User{
    _id?:string,
    name?: Name,
    phone?: string,
    email: string,
    password: string,
    image?: Image,
    address?: Address,
    isAdmin?: boolean,
    isBusiness?: boolean,
    createdAt?: string
}