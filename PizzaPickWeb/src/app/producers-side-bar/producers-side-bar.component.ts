import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ProducerSharing } from '../services/producerSharing.service';
import { Producer } from '../models/producer';

@Component({
  selector: 'producers-side-bar',
  templateUrl: './producers-side-bar.component.html',
  styleUrls: ['./producers-side-bar.component.css']
})
export class ProducersSideBarComponent implements OnInit {
  producers: Producer[];  
  selectedProducer: Producer;

  constructor(
    private http: HttpService,
    private producerSharing: ProducerSharing
    ) { }

  ngOnInit(): void {
    this.http.getProducers().subscribe(data =>
      this.producers = data);
  }

  producerSelected(element: HTMLElement) {

    let current = element;
    if (current.className === "listitem") {
      this.selectedProducer = <Producer>this.producers
        .find(it => it.name === current.id);      
    }

    let parent = element.parentElement;
    if (parent.className === "listitem") {
      this.selectedProducer = <Producer>this.producers
        .find(it => it.name === parent.id);      
    }

    this.producerSharing.setProducer(this.selectedProducer);
  }
}
