import { Producer } from "./producer";
import { Composition } from "./composition";
import { Params } from "./params";

export class Pizza {
    name?: string;
    price?: number;
    imageUrl?: string;
    params?: Params;
    composition?: Composition;
    producer?: Producer;
}