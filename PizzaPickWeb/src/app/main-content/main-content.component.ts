import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PizzaForSelectedProducer } from '../models/pizzaForSelectedProducer';
import { Producer } from '../models/producer';
import { HttpService } from '../services/http.service';

import { ProducerSharing } from '../services/producerSharing.service';

@Component({
  selector: 'main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  selectedProducer: Producer;
  pizzasForProducer: PizzaForSelectedProducer[] = [];

  constructor(
    private producerSharing: ProducerSharing,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.producerSharing.getProducer().subscribe(
      producer => {
        this.selectedProducer = producer;
        this.pizzasForProducer = [];
        this.getPizzasForProducer(producer.name);
      });
  }

  private getPizzasForProducer(producerName: string) {
    this.http
      .getPizzasByProducerName(producerName)
      .subscribe(data => {
        data.forEach(async pizza => {
          let doughTypes = await this.http.GetDougnTypesForPizza(pizza);
          let crustTypes = await this.http.GetCrustsForPizza(pizza);
          let diametersForPizza = await this.http.GetDiametersForPizza(pizza);

          let pizForProducer: PizzaForSelectedProducer =
          {
            crusts: crustTypes,
            doughs: doughTypes,
            diameters: diametersForPizza,
            composition: pizza.composition,
            imageUrl: pizza.imageUrl,
            name: pizza.name,
            params: pizza.params,
            price: pizza.price,
            producer: pizza.producer,
          };

          this.pizzasForProducer.push(pizForProducer);
        });
      })
  }
}
