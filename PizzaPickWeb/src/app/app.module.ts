import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PizzasSideBarComponent } from './pizzas-side-bar/pizzas-side-bar.component';
import { ProducersSideBarComponent } from './producers-side-bar/producers-side-bar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ProducerComponent } from './producer/producer.component';
import { HttpService } from './services/http.service';

@NgModule({
    imports: [
        BrowserModule        
    ],
    declarations: [
        AppComponent,
        PizzasSideBarComponent,
        ProducersSideBarComponent,
        HeaderComponent,
        FooterComponent,
        MainContentComponent,
        ProducerComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }