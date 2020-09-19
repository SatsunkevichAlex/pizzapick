import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Producer } from '../models/producer';

@Injectable({ providedIn: 'root' })
export class ProducerSharing {
    private producer = new Subject<Producer>();    

    getProducer(): Observable<Producer> {
        return this.producer.asObservable();
    }

    setProducer(iputProducer: Producer){
        this.producer.next(iputProducer);
    }    
}