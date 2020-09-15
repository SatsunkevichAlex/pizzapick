import { Injectable } from '@angular/core';
import { Producer } from '../models/producer';

@Injectable({ providedIn: 'root'})
export class HttpService{
    producers: Producer[] = [
        { 
            name: "Пицца лисица",
            logoPath: 'assets/img/pzzLogo.png',            
            link: "https://pzz.by/"
        },
        {
            name: "Папа Джонс",
            logoPath: 'assets/img/papaLogo.png',            
            link: "https://new.papajohns.by/"
        },
        { 
            name: "Пицца лисица",
            logoPath: 'assets/img/pzzLogo.png',            
            link: "https://pzz.by/"
        }
    ]

    getProducers(): Producer[] {
        return this.producers;
    }
}