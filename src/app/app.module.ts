import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CostumersUSERSComponent } from './costumers-users/costumers-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MagazineUSERSComponent } from './magazine-users/magazine-users.component';
import { SidenavListComponent } from './header/sidenav-list/sidenav-list.component';
import { MaterialModule } from './angular-material.module';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [
        AppComponent,
        CostumersUSERSComponent,
        MagazineUSERSComponent,
       SidenavListComponent,
       HeaderComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
    ]
})
export class AppModule { }
