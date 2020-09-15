import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Producer } from '../models/producer';

@Component({
  selector: 'producers-side-bar',
  templateUrl: './producers-side-bar.component.html',
  styleUrls: ['./producers-side-bar.component.css']
})
export class ProducersSideBarComponent implements OnInit {
  producers: Producer[];  

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.producers = this.http.getProducers();
  }

}
