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

  async onCrustChanges(event: Event): Promise<void> {
    let pizzaElement = this.getPizzaElement(event);
    let producerName = this.selectedProducer.name;

    if (producerName == this.PAPA_JOHNS) {
      const diamsForCheese = ["30", "35", "40"];
      const diamsForClassic = ["23", "30", "35", "40"];
      const dougnForCheese = ["Классическое"];
      const dougnForClassic = ["Классическое", "Тонкое"];
      const mixPizzas = ["Супер Микс", "Папа Микс", "Папа Микс Рэнч"];
      const diamsForMix = ["35", "40"];

      let crustsDropdown = this.getDropdown(pizzaElement, "#crust-dropdown");
      let dougnDropdown = this.getDropdown(pizzaElement, "#dougn-dropdown");
      let diamDropdown = this.getDropdown(pizzaElement, "#diam-dropdown");

      let crustValue = this.getDropDownSelectedValue(crustsDropdown);
      let pizzaName = this.getPizzaName(pizzaElement);

      if (crustValue === "Классический") {
        if ((mixPizzas.indexOf(pizzaName)) > -1) {
          this.setDropDownOptions(diamDropdown, diamsForMix);
          this.setDropDownOptions(dougnDropdown, dougnForClassic);
        } else {
          this.setDropDownOptions(dougnDropdown, dougnForClassic);
          this.setDropDownOptions(diamDropdown, diamsForClassic);
        }
      }
      else {
        if ((mixPizzas.indexOf(pizzaName)) > -1) {
          this.setDropDownOptions(diamDropdown, diamsForMix);
          this.setDropDownOptions(dougnDropdown, dougnForCheese);
        }
        else {
          this.setDropDownOptions(dougnDropdown, dougnForCheese)
          this.setDropDownOptions(diamDropdown, diamsForCheese);
        }
      }
    }

  }

  async onDougnChange(event: Event): Promise<void> {
    let pizzaElement = this.getPizzaElement(event);
    let producerName = this.selectedProducer.name;
    let pizzaName = this.getPizzaName(pizzaElement);

    if (producerName === this.PAPA_JOHNS) {
      const diamsForThinMix = ["35", "40"];
      const diamsForThin = ["30", "35", "40"];
      const diamsForClassic = ["23", "30", "35", "40"];
      const mixPizzas = ["Супер Микс", "Папа Микс", "Папа Микс Рэнч"];

      let diamDropDown = this.getDropdown(pizzaElement, "#diam-dropdown");
      let dougnDropDown = this.getDropdown(pizzaElement, "#dougn-dropdown")

      let dougnValue = this.getDropDownSelectedValue(dougnDropDown);

      if ((mixPizzas.indexOf(pizzaName)) > -1) {
        this.setDropDownOptions(diamDropDown, diamsForThinMix);
      } else {
        if (dougnValue == "Тонкое") {
          this.setDropDownOptions(diamDropDown, diamsForThin);
        }
        else {
          this.setDropDownOptions(diamDropDown, diamsForClassic);
        }
        let diameter = this.getPizzaDiameter(pizzaElement);
        let crust = this.getPizzaCrust(pizzaElement);
        let dougn = this.getPizzaDougn(pizzaElement);

        let newPrice = await this.http.getPriceForConfiguration(
          diameter, crust, dougn, pizzaName, producerName);

        this.setPizzaPrice(pizzaElement, newPrice.toString());
      }
    } else if (this.selectedProducer.name === "Пицца Лисица") {
      const diamsForThin = ["36"];
      const diamsForClassic = ["31", "36"];

      let diamDropDown = this.getDropdown(pizzaElement, "#diam-dropdown");
      let dougnDropDown = this.getDropdown(pizzaElement, "#dougn-dropdown");
      let dougnValue = this.getDropDownSelectedValue(dougnDropDown);

      if (dougnValue == "Тонкое") {
        this.setDropDownOptions(diamDropDown, diamsForThin);
      }
      else {
        this.setDropDownOptions(diamDropDown, diamsForClassic);
      }

      let diameter = this.getPizzaDiameter(pizzaElement);
      let crust = this.getPizzaCrust(pizzaElement);
      let dougn = this.getPizzaDougn(pizzaElement);

      let newPrice = await this.http.getPriceForConfiguration(
        diameter, crust, dougn, pizzaName, producerName);

      this.setPizzaPrice(pizzaElement, newPrice.toString());

    }
  }

    async onDiameterChanges(event: Event): Promise < void> {
      const diamWithoutCheeseCrust = 23;
      const arrayCrustClassic = ["Классический"];
      const arrayCrustWithCheese = ["Классический", "Сырный борт"];
      const arrayDougnForSmall = ["Классическое"];
      const arrayDougn = ["Классическое", "Тонкое"]

    let pizzaElement = this.getPizzaElement(event);
      let producerName = this.selectedProducer.name;

      if(producerName === this.PAPA_JOHNS) {
      let crustsDropDown = this.getDropdown(pizzaElement, "#crust-dropdown");
      let diamDropDown = this.getDropdown(pizzaElement, "#diam-dropdown");
      let dougnDropDown = this.getDropdown(pizzaElement, "#dougn-dropdown")

      let diamValue = this.getDropDownSelectedValue(diamDropDown);

      if (+diamValue === diamWithoutCheeseCrust) {
        this.setDropDownOptions(crustsDropDown, arrayCrustClassic);
        this.setDropDownOptions(dougnDropDown, arrayDougnForSmall);
      }
      else {
        this.setDropDownOptions(crustsDropDown, arrayCrustWithCheese);
        this.setDropDownOptions(dougnDropDown, arrayDougn);
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
    var dougnSelect = <HTMLSelectElement>pizzaElement.querySelector("#dougn-dropdown");
    return dougnSelect.options[dougnSelect.selectedIndex].value;
  }

  private getPizzaName(pizzaElement: HTMLElement): string {
    return pizzaElement.querySelector("#pizza-name").textContent;
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
