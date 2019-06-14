import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import * as $ from 'jquery';

//Component
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

//Cookie
import { CookieService } from 'ngx-cookie-service';

//Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular Material
import { AMaterialModule } from './AMaterialImports';
import { FlexLayoutModule } from '@angular/flex-layout';

//route
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

//Services
import { BDUrl } from './constan';
import { AppService } from './app.service';

//popusps
import { Bienvenido_modal } from './popups/Bienvenida/Bienvenido';
import { Alert_modal } from './popups/Alert/Alert';
import { ColaboracionVComponent } from './colaboracion-v/colaboracion-v.component';

//pipes
import {CurrencyDecimalPipe} from './pipes/currencydecimal.pipe';

//rutas 
const rutas: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'colaboracion', component: ColaboracionVComponent}
];

@NgModule({
  // Componentes
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    Bienvenido_modal,
    Alert_modal,
    ColaboracionVComponent,
    CurrencyDecimalPipe
  ],
  // Modulo
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AMaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot(rutas),
    HttpClientModule
  ],
  entryComponents: [Bienvenido_modal, Alert_modal],
  providers: [AppService, BDUrl, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
