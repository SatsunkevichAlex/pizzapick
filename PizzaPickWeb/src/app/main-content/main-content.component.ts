import { PizzaForSelectedProducer } from '../models/pizzaForSelectedProducer';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Producer } from '../models/producer';
import { ProducerForSelectedPizza } from '../models/producerForSelectedPizza'

import { ProducerSharing as ProducerSharingService } from '../services/producerSharing.service';
import { Pizza } from '../models/pizza';
import { PizzaSharingService } from '../services/pizzaSharing.service';

@Component({
  selector: 'main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  private diameterDropdownId = "diam-dropdown";
  private dougnDropdownId = "dougn-dropdown";
  private crustDropdownId = "crust-dropdown";

  private diamDropDownSelector = "#diam-dropdown";
  private dougnDropDownSelector = "#dougn-dropdown";
  private crustDropDownSelector = "#crust-dropdown";
  private pizzaNameSelector = "#pizza-name"
  private pizzaPriceSelector = "#pizza-price";

  private PAPA_JOHNS = "Папа Джонс";
  private PIZZA_FOX = "Пицца Лисица";

  private mixPizzas = ["Супер Микс", "Папа Микс", "Папа Микс Рэнч"];

  shouldDisplayLoading: boolean;
  shouldDisplayInfoFor: string;
  selectedProducer: Producer;
  selectedPizza: Pizza;
  pizzasForProducer: PizzaForSelectedProducer[] = [];
  producersForPizza: ProducerForSelectedPizza[] = [];
  papaImgSrc: string;
  foxImgSrc: string;

  selectedPizzaOptions: string[];
  selectedPizzaPrices: number[];

  constructor(
    private producerSharing: ProducerSharingService,
    private pizzaSharing: PizzaSharingService,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.producerSharing.getProducer().subscribe(
      producer => {
        this.shouldDisplayInfoFor = "producer";
        this.selectedProducer = producer;
        this.pizzasForProducer = [];
        this.getPizzasForProducer(producer.name);
      });

    this.pizzaSharing.getPizza().subscribe(
      pizza => {
        this.shouldDisplayInfoFor = "pizza";
        this.selectedPizza = pizza;
        this.getProducersForPizza(pizza);
      }
    );
  }

  onDropDownChange(event: Event) {
    let target = <HTMLSelectElement>event.target;
    switch (target.id) {
      case this.diameterDropdownId:
        this.onDiameterChange(event);
        break;
      case this.dougnDropdownId:
        this.onDougnChange(event);
        break;
      case this.crustDropdownId:
        this.onCrustChange(event);
        break;
      default:
        console.log("Drop down is not recognized" + target);
    }
  }

  private async onCrustChange(event: Event): Promise<void> {
    let pizzaElement = this.getPizzaElement(event);
    let producerName = this.selectedProducer.name;
    let pizzaName = this.getPizzaName(pizzaElement);

    switch (producerName) {
      case this.PAPA_JOHNS:
        const diamsForCheese = ["30", "35", "40"];
        const diamsForClassic = ["23", "30", "35", "40"];
        const dougnForCheese = ["Классическое"];
        const dougnForClassic = ["Классическое", "Тонкое"];
        const diamsForMix = ["35", "40"];

        let crustsDropdown = this.getDropdown(pizzaElement, this.crustDropDownSelector);
        let dougnDropdown = this.getDropdown(pizzaElement, this.dougnDropDownSelector);
        let diamDropdown = this.getDropdown(pizzaElement, this.diamDropDownSelector);

        let crustValue = this.getDropDownSelectedValue(crustsDropdown);

        if (crustValue === "Классический") {
          if (this.isMixPizza(pizzaName)) {
            this.setDropDownOptions(diamDropdown, diamsForMix);
            this.setDropDownOptions(dougnDropdown, dougnForClassic);
          } else {
            this.setDropDownOptions(dougnDropdown, dougnForClassic);
            this.setDropDownOptions(diamDropdown, diamsForClassic);
          }
        }
        else if (crustValue === "Сырный борт") {
          if (this.isMixPizza(pizzaName)) {
            this.setDropDownOptions(diamDropdown, diamsForMix);
            this.setDropDownOptions(dougnDropdown, dougnForCheese);
          }
          else {
            this.setDropDownOptions(dougnDropdown, dougnForCheese)
            this.setDropDownOptions(diamDropdown, diamsForCheese);
          }
        }
        break;
      case this.PIZZA_FOX:
    }

    let diameter = this.getPizzaDiameter(pizzaElement);
    let crust = this.getPizzaCrust(pizzaElement);
    let dougn = this.getPizzaDougn(pizzaElement);

    let newPrice = await this.http.getPriceForConfiguration(
      diameter, crust, dougn, pizzaName, producerName);

    this.setPizzaPrice(pizzaElement, newPrice.toString());
  }

  private async onDougnChange(event: Event): Promise<void> {
    let pizzaElement = this.getPizzaElement(event);
    let producerName = this.selectedProducer.name;
    let pizzaName = this.getPizzaName(pizzaElement);

    if (producerName === this.PAPA_JOHNS) {
      const diamsForThinMix = ["35", "40"];
      const diamsForThin = ["30", "35", "40"];
      const diamsForClassic = ["23", "30", "35", "40"];

      let diamDropDown = this.getDropdown(pizzaElement, this.diamDropDownSelector);
      let dougnDropDown = this.getDropdown(pizzaElement, this.dougnDropDownSelector)

      let dougnValue = this.getDropDownSelectedValue(dougnDropDown);

      if (this.isMixPizza(pizzaName)) {
        this.setDropDownOptions(diamDropDown, diamsForThinMix);
      }
      else {
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
    else if (this.selectedProducer.name === "Пицца Лисица") {
      const diamsForThin = ["36"];
      const diamsForClassic = ["31", "36"];

      let diamDropDown = this.getDropdown(pizzaElement, this.diamDropDownSelector);
      let dougnDropDown = this.getDropdown(pizzaElement, this.dougnDropDownSelector);
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

  private async onDiameterChange(event: Event): Promise<void> {
    const diamWithoutCheeseCrust = 23;
    const arrayCrustClassic = ["Классический"];
    const arrayCrustWithCheese = ["Классический", "Сырный борт"];
    const arrayDougnForSmall = ["Классическое"];
    const arrayDougn = ["Классическое", "Тонкое"]

    let pizzaElement = this.getPizzaElement(event);
    let producerName = this.selectedProducer.name;

    if (producerName === this.PAPA_JOHNS) {
      let crustsDropDown = this.getDropdown(pizzaElement, this.crustDropDownSelector);
      let diamDropDown = this.getDropdown(pizzaElement, this.diamDropDownSelector);
      let dougnDropDown = this.getDropdown(pizzaElement, this.dougnDropDownSelector)

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

  private isMixPizza(pizzaName: string): boolean {
    return (this.mixPizzas.indexOf(pizzaName)) > -1
  }

  private setPizzaPrice(pizzaElement: HTMLElement, price: string): void {
    pizzaElement.querySelector(this.pizzaPriceSelector)
      .textContent = price.toString();
  }

  private getPizzaDiameter(pizzaElement: HTMLElement): number {
    var diamSelect = <HTMLSelectElement>pizzaElement
      .querySelector(this.diamDropDownSelector);
    return +diamSelect.options[diamSelect.selectedIndex].value;
  }

  private getPizzaCrust(pizzaElement: HTMLElement): string {
    var crustSelect = <HTMLSelectElement>pizzaElement
      .querySelector(this.crustDropDownSelector);
    return crustSelect.options[crustSelect.selectedIndex].value;
  }

  private getPizzaDougn(pizzaElement: HTMLElement): string {
    var dougnSelect = <HTMLSelectElement>pizzaElement
      .querySelector(this.dougnDropDownSelector);
    return dougnSelect.options[dougnSelect.selectedIndex].value;
  }

  private getPizzaName(pizzaElement: HTMLElement): string {
    return pizzaElement.querySelector(this.pizzaNameSelector).textContent;
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

  private async getProducersForPizza(pizza: Pizza): Promise<void> {
    this.producersForPizza = [];

    let producers = await this.http.getProducersByPizzaName(pizza);
    for (let i = 0; i < producers.length; i++) {
      let options = await
        this.http.getOptionsForPizzaByProducer(pizza, producers[i]);
      let prices = await
        this.http.getPricesForPizzaByProducer(pizza, producers[i]);
      let diams = await
        this.http.getDiametersForPizzaByProducer(pizza, producers[i]);

      this.producersForPizza.push({
        name: producers[i].name,
        logoUrl: producers[i].logoUrl,
        options: options,
        prices: prices,
        diameters: diams,
        content: pizza.composition.content
      });

      await this.getPizzaImgSrcForProducer(this.producersForPizza);
    }
  }

  private async getPizzaImgSrcForProducer(producersForPizza: Producer[]) {    
    for (let i = 0; i < producersForPizza.length; i++) {
      if (producersForPizza[i].name === this.PIZZA_FOX) {
        this.foxImgSrc = await
          this.http.getImgUrlForPizzaByProducer(this.selectedPizza, this.PIZZA_FOX);
      };
      if (producersForPizza[i].name === this.PAPA_JOHNS) {
        this.papaImgSrc = await
          this.http.getImgUrlForPizzaByProducer(this.selectedPizza, this.PAPA_JOHNS);
      };
    }
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