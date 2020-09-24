import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PizzasSideBarComponent } from './pizzas-side-bar/pizzas-side-bar.component';
import { ProducersSideBarComponent } from './producers-side-bar/producers-side-bar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { HttpClientModule } from '@angular/common/http';
import { ContentToStringPipe } from './content-to-string.pipe';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent,
        PizzasSideBarComponent,
        ProducersSideBarComponent,
        HeaderComponent,
        FooterComponent,
        MainContentComponent,
        ContentToStringPipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }