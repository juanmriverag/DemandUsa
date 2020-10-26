import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import * as $ from 'jquery';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Component
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CargaSapComponent } from './configuracion/carga-sap/carga-sap.component';
import { ColaboracionVComponent } from './colaboracion-v/colaboracion-v.component';
import { UsermanagerComponent } from './configuracion/usermanager/usermanager.component';

//Cookie
import { CookieService } from 'ngx-cookie-service';

//Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';

//Angular Material
import { AMaterialModule } from './AMaterialImports';
import { CDKModule } from './CDKImports';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GoogleChartsModule } from 'angular-google-charts';

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
import { newNovedad_modal } from './popups/newNovedad/newNovedad';
import { TablaVts_modal } from './popups/TablaVts/TablaVts';
import { GraficaVts_modal } from './popups/GraficaVts/GraficaVts';
import { itemChartP_modal } from './popups/itemChartP/itemChartP';
import { CumpTotal_modal } from './popups/CumpTotal/CumpTotal';
import { Note_modal } from './popups/Note/Note';
import { Notes_modal } from './popups/Notes/Notes';

import { ResizableModule } from 'angular-resizable-element';

//pipes
import { CurrencyDecimalPipe } from './pipes/currencydecimal.pipe';
import { FilterUniquePipe } from './pipes/FilterUnique.pipe';
import { FormatNumberPipe } from './pipes/formatNumber.pipe';
import { from } from 'rxjs';

//rutas
const rutas: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'DemandForecast', component: ColaboracionVComponent },
	// { path: 'configuracion/cargaSap', component: CargaSapComponent },
	{ path: 'setting/Users', component: UsermanagerComponent },
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
		TablaVts_modal,
		GraficaVts_modal,
		itemChartP_modal,
		CumpTotal_modal,
		newNovedad_modal,
		Note_modal,
		Notes_modal,
		ColaboracionVComponent,
		CurrencyDecimalPipe,
		FilterUniquePipe,
		FormatNumberPipe,
		CargaSapComponent,
		UsermanagerComponent,
	],
	// Modulo
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		BrowserAnimationsModule,
		MatVideoModule,
		AMaterialModule,
		CDKModule,
		FlexLayoutModule,
		RouterModule.forRoot(rutas, { useHash: true }),
		// RouterModule.forRoot(rutas),
		HttpClientModule,
		ResizableModule,
		FontAwesomeModule,
		GoogleChartsModule,
	],
	entryComponents: [
		Bienvenido_modal,
		Alert_modal,
		Load_modal,
		TablaVts_modal,
		GraficaVts_modal,
		itemChartP_modal,
		CumpTotal_modal,
		newNovedad_modal,
		Note_modal,
		Notes_modal,
	],
	providers: [AppService, BDUrl, CookieService],
	bootstrap: [AppComponent],
})
export class AppModule {}
