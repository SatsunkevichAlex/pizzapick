import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Producer } from '../models/producer';
import { Pizza } from '../models/pizza'

@Injectable({ providedIn: 'root' })
export class HttpService {

    private host = "http://localhost:5000";

    constructor(private http: HttpClient) { }

    getProducers(): Observable<Producer[]> {
        return this
            .http.get<Producer[]>(`${this.host}/producers`);
    }

    getPizzasSidebar(): Observable<Pizza[]> {
        return this
            .http.get<Pizza[]>(`${this.host}/pizzas-sidebar`);
    }

    getPizzasByProducer(producer: Producer): Observable<Pizza[]> {
        var result = this
            .http.get<Pizza[]>
            (`${this.host}/pizzas-by-producer-name?producerName=${producer.name}`);
        return result;
    }

    getPizzasByProducerName(producerName: string): Observable<Pizza[]> {
        var result = this
            .http.get<Pizza[]>
            (`${this.host}/pizzas-by-producer-name?producerName=${producerName}`);
        return result;
    }

    getPizza(name: string, price: number): Observable<Pizza> {
        return this.http
            .get<Pizza>(`${this.host}/pizza?name=${name}&price=${price}`);
    }

    async getDougnTypesForPizza(pizza: Pizza) {
        return await this.http
            .post<string[]>(
                `${this.host}/get-dougns-for-pizza`,
                pizza).toPromise();
    }

    async getCrustsForPizza(pizza: Pizza) {
        return await this.http
            .post<string[]>(
                `${this.host}/get-crusts-for-pizza`,
                pizza).toPromise();
    }

    async getDiametersForPizza(pizza: Pizza) {
        return await this.http
            .post<string[]>(
                `${this.host}/get-diameters-for-pizza`,
                pizza).toPromise();
    }

    async getPriceForPizza(pizza: Pizza) {
        return await this.http
            .post<number>(
                `${this.host}/get-price-for-pizza`,
                pizza).toPromise();
    }

    async getPriceForConfiguration(
        diameter: number,
        crust: string,
        dougn: string,
        pizzaName: string,
        producerName: string
    ): Promise<number> {
        return await this.http.get<number>(`${this.host}/get-price-for-config`,
            {
                params: {
                    ['diameter']: diameter.toString(),
                    ['crust']: crust,
                    ['dougn']: dougn,
                    ['pizzaName']: pizzaName,
                    ['producerName']: producerName
                }
            }).toPromise();
    }

    async getProducersByPizzaName(pizza: Pizza): Promise<Producer[]> {
        return await this.http.get<Producer[]>
            (`${this.host}/get-producers-by-pizzaName`, { params: { ['pizzaName']: pizza.name } })
            .toPromise();
    }

    async getOptionsForPizzaByProducer(pizza: Pizza, producer: Producer): Promise<string[]> {
        return await this.http.get<string[]>
            (`${this.host}/get-options-for-pizza-by-producer`, {
                params: {
                    ['pizzaName']: pizza.name,
                    ['producerName']: producer.name
                }
            })
            .toPromise();
    }

    async getPricesForPizzaByProducer(pizza: Pizza, producer: Producer): Promise<number[]> {
        return await this.http.get<number[]>
            (`${this.host}/get-prices-for-pizza-by-producer`, {
                params: {
                    ['pizzaName']: pizza.name,
                    ['producerName']: producer.name
                }
            })
            .toPromise();
    }

    async getDiametersForPizzaByProducer(pizza: Pizza, producer: Producer): Promise<number[]> {
        return await this.http.get<number[]>
            (`${this.host}/get-diameters-for-pizza-by-producer`, {
                params: {
                    ['pizzaName']: pizza.name,
                    ['producerName']: producer.name
                }
            })
            .toPromise();
    }

    async getImgUrlForPizzaByProducer(pizza: Pizza, producerName: string): Promise<string> {
        return await this.http.get<string>
            (`${this.host}/get-imgage-url-for-pizza-by-producer`, {
                params: {
                    ['pizzaName']: pizza.name,
                    ['producerName']: producerName
                }
            }).toPromise();
    }
}