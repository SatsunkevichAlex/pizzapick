import { Component, OnInit } from '@angular/core';
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
  private PAPA_JOHNS = "Папа Джонс";

  shouldDisplayLoading: boolean;
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

  async onDiameterChanges(event: Event) {
    const diamWithoutCheeseCrust = 23;
    const arrayCrustClassic = ["Классический"];
    const arrayCrustWithCheese = ["Классический", "Сырный борт"];
    let pizzaElement = this.getPizzaElement(event);
    let producerName = this.selectedProducer.name;

    if (producerName === this.PAPA_JOHNS) {
      let crustsDropDown = this.getDropdown(pizzaElement, "#crust-dropdown");
      let diamDropDown = this.getDropdown(pizzaElement, "#diam-dropdown");

      let diamValue = this.getDropDownSelectedValue(diamDropDown);

      if (+diamValue === diamWithoutCheeseCrust) {
        this.setDropDownOptions(crustsDropDown, arrayCrustClassic);
      }
      else {
        this.setDropDownOptions(crustsDropDown, arrayCrustWithCheese);
      }
    }

    let diameter = this.getPizzaDiameter(pizzaElement);
    let crust = this.getPizzaCrust(pizzaElement);
    let dougn = this.getPizzaDougn(pizzaElement);
    let pizzaName = this.getPizzaName(pizzaElement);

    let newPrice = await this.http.getPriceForConfiguration(
      diameter, crust, dougn, pizzaName, producerName);

    this.setPizzaPrice(pizzaElement, newPrice.toString());
  }

  private setPizzaPrice(pizzaElement: HTMLElement, price: string): void {
    pizzaElement.querySelector("#pizza-price").textContent = price.toString();
  }

  private getPizzaDiameter(pizzaElement: HTMLElement): number {
    var diamSelect = <HTMLSelectElement>pizzaElement.querySelector("#diam-dropdown");
    return +diamSelect.options[diamSelect.selectedIndex].value;
  }

  private getPizzaCrust(pizzaElement: HTMLElement): string {
    var crustSelect = <HTMLSelectElement>pizzaElement.querySelector("#crust-dropdown");
    return crustSelect.options[crustSelect.selectedIndex].value;
  }

  private getPizzaDougn(pizzaElement: HTMLElement): string {
    var dougnSelect = <HTMLSelectElement>pizzaElement.querySelector("#dropdown-dougn");
    return dougnSelect.options[dougnSelect.selectedIndex].value;
  }

  private getPizzaName(pizzaElement: HTMLElement): string {
    return pizzaElement.className;    
  }

  private setDropDownOptions(dropdown: HTMLSelectElement, values: string[]): void {
    this.clearDropdown(dropdown);
    this.fillDropDown(dropdown, values);
  }

  private fillDropDown(dropdown: HTMLSelectElement, values: string[]): void {
    for (let valIndex = 0; valIndex < values.length; valIndex++) {
      let opt = document.createElement("option")
      opt.text = values[valIndex];
      opt.value = values[valIndex];
      dropdown.add(opt);
    }
  }

  private clearDropdown(dropdown: HTMLSelectElement): void {
    dropdown.options.length = 0;
  }

  private getDropDownSelectedValue(dropdown: HTMLSelectElement): string {
    return dropdown.options[dropdown.selectedIndex].value
  }

  private getDropdown(pizzaElement: HTMLElement, dropDownId: string): HTMLSelectElement {
    return <HTMLSelectElement>pizzaElement.querySelector(dropDownId);
  }

  private getPizzaElement(event: Event): HTMLElement {
    return (<HTMLElement>event.target)
      .parentElement.parentElement;
  }

  private getPizzasForProducer(producerName: string) {
    this.http
      .getPizzasByProducerName(producerName)
      .subscribe(data => {
        this.shouldDisplayLoading = true;
        data.forEach(async pizza => {
          let doughTypes = await this.http.getDougnTypesForPizza(pizza);
          let crustTypes = await this.http.getCrustsForPizza(pizza);
          let diametersForPizza = await this.http.getDiametersForPizza(pizza);

          let pizForProducer: PizzaForSelectedProducer =
          {
            crusts: crustTypes,
            doughs: doughTypes,
            diameters: diametersForPizza,
            composition: pizza.composition,
            imageUrl: pizza.imageUrl,
            name: pizza.name,
            params: pizza.params,
            producer: pizza.producer,
          };

          pizForProducer.price =
            await this.http.getPriceForPizza(pizForProducer);

          this.pizzasForProducer.push(pizForProducer);
          this.shouldDisplayLoading = false;
        });
      })
  }
}
