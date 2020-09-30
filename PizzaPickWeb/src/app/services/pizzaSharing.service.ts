import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Pizza } from '../models/pizza';

@Injectable({ providedIn: 'root' })
export class PizzaSharingService {
    private pizza = new Subject<Pizza>();    

    getPizza(): Observable<Pizza> {
        return this.pizza.asObservable();
    }

    setPizza(iputPizza: Pizza){
        this.pizza.next(iputPizza);
    }    
}