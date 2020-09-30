import { Component, OnInit } from '@angular/core';
import { PizzaSharingService } from '../services/pizzaSharing.service';

import { Pizza } from '../models/pizza'
import { HttpService } from '../services/http.service';

@Component({
  selector: 'pizzas-side-bar',
  templateUrl: './pizzas-side-bar.component.html',
  styleUrls: ['./pizzas-side-bar.component.css']
})
export class PizzasSideBarComponent implements OnInit {
  pizzas: Pizza[];

  constructor(
    private http: HttpService,
    private pizzaSharingService: PizzaSharingService
    ) { }

  ngOnInit(): void {
    this.http.getPizzasSidebar().subscribe(data =>
      this.pizzas = data)
  }
  
  onClick(pizza: Pizza) {    
    this.pizzaSharingService.setPizza(pizza);
  }
}
