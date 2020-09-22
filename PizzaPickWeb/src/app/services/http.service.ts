import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Producer } from '../models/producer';
import { Pizza } from '../models/pizza'

@Injectable({ providedIn: 'root' })
export class HttpService {

    constructor(private http: HttpClient) { }

    getProducers(): Observable<Producer[]> {
        return this
            .http.get<Producer[]>("http://localhost:54720/producers");
    }

    getPizzasSidebar(): Observable<Pizza[]> {
        return this
            .http.get<Pizza[]>("http://localhost:54720/pizzas-sidebar");
    }

    getPizzasByProducer(producer: Producer): Observable<Pizza[]> {
        var result = this
            .http.get<Pizza[]>
            (`http://localhost:54720/pizzas-by-producer-name?producerName=${producer.name}`);                       
        return result;
    }

    getPizzasByProducerName(producerName: string): Observable<Pizza[]> {
        var result = this
            .http.get<Pizza[]>
            (`http://localhost:54720/pizzas-by-producer-name?producerName=${producerName}`);                       
        return result;
    }

    getPizza(name: string, price: number): Observable<Pizza> {
        return this.http
            .get<Pizza>(`http://localhost:54720/pizza?name=${name}&price=${price}`);
    }

    async getDougnTypesForPizza(pizza: Pizza){
        return await this.http
        .post<string[]>(
            'http://localhost:54720/get-dougns-for-pizza', 
            pizza).toPromise();
    }
    
    async getCrustsForPizza(pizza: Pizza){
        return await this.http
        .post<string[]>(
            'http://localhost:54720/get-crusts-for-pizza', 
            pizza).toPromise();
    }

    async getDiametersForPizza(pizza: Pizza){
        return await this.http
        .post<string[]>(
            'http://localhost:54720/get-diameters-for-pizza', 
            pizza).toPromise();
    }

    async getPriceForPizza(pizza: Pizza) {
        return await this.http
        .post<number>(
            'http://localhost:54720/get-price-for-pizza', 
            pizza).toPromise();
    }

    async getPriceForConfiguration(
        diameterInput: number,
        crust: string,
        dougn: string,
        pizzaName: string,
        producerName: string
    ): Promise<number> {
        return await this.http.get<number>('http://localhost:54720/get-price-for-config',
        { params: {
            ['diameter']: diameterInput.toString(),
            ['crust']: crust,
            ['dougn']: dougn,
            ['pizzaName']: pizzaName,
            ['producerName']: producerName
        }}).toPromise();        
    }
}