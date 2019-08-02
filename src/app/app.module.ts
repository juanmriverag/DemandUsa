import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import * as $ from 'jquery';

//Component
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CargaSapComponent } from './configuracion/carga-sap/carga-sap.component';

//Cookie
import { CookieService } from 'ngx-cookie-service';

//Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular Material
import { AMaterialModule } from './AMaterialImports';
import { CDKModule } from './CDKImports';
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
import { Load_modal } from './popups/Load/Load';
import { ColaboracionVComponent } from './colaboracion-v/colaboracion-v.component';
import { ResizableModule } from 'angular-resizable-element';

//pipes
import {CurrencyDecimalPipe} from './pipes/currencydecimal.pipe';
import {FilterUniquePipe} from './pipes/FilterUnique.pipe';
import { from } from 'rxjs';

//rutas 
const rutas: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'DemandForecast', component: ColaboracionVComponent},
  { path: 'configuracion/cargaSap', component: CargaSapComponent}
];

@NgModule({
  // Componentes
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    Bienvenido_modal,
    Alert_modal,
    Load_modal,
    ColaboracionVComponent,
    CurrencyDecimalPipe,
    FilterUniquePipe,
    CargaSapComponent
  ],
  // Modulo
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AMaterialModule,
    CDKModule,
    FlexLayoutModule,
    RouterModule.forRoot(rutas),
    HttpClientModule,
    ResizableModule
  ],
  entryComponents: [Bienvenido_modal, Alert_modal,Load_modal],
  providers: [AppService, BDUrl, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
