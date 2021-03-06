import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/pages/header/header.component';
import { SidebarComponent } from './components/pages/sidebar/sidebar.component';
import { DefaultComponent } from './components/pages/subpages/default/default.component';
import { app_routing } from './app.routes';
import { PagesComponent } from './components/pages/pages/pages.component';
import { LoginComponent } from './components/login/login.component';
import { CreateProjectComponent } from './components/pages/subpages/create-project/create-project.component';
import { ListProjectsComponent } from './components/pages/subpages/list-projects/list-projects.component';
import { StatisticsComponent } from './components/pages/subpages/statistics/statistics.component';
import { ProfileComponent } from './components/pages/subpages/profile/profile.component';
import { DetailProjectComponent } from './components/pages/subpages/project/subpages/details/detail-project/detail-project.component';
import { ProjectComponent } from './components/pages/subpages/project/project/project.component';
import { BarraComponent } from './components/pages/subpages/project/barra/barra.component';
import { DocumentsComponent } from './components/pages/subpages/project/subpages/documents/documents.component';
import { ReportsComponent } from './components/pages/subpages/project/subpages/reports/reports.component';
import { LogComponent } from './components/pages/subpages/project/subpages/log/log.component';
import { BarraFasesComponent } from './components/pages/subpages/project/subpages/details/barra-fases/barra-fases.component';
import { FaseComponent } from './components/pages/subpages/project/subpages/details/subpages/fase/fase.component';
import { AvanzaraRecReqComponent } from './components/pages/subpages/project/subpages/avanzara-rec-req/avanzara-rec-req.component';
import { AvanzaraAnalisisComponent } from './components/pages/subpages/project/subpages/avanzara-analisis/avanzara-analisis.component';
import { AvanzaraAprobacionComponent } from './components/pages/subpages/project/subpages/avanzara-aprobacion/avanzara-aprobacion.component';
import { AvanzaraPlanificacionComponent } from './components/pages/subpages/project/subpages/avanzara-planificacion/avanzara-planificacion.component';
import { AvanzaraEspecificacionesComponent } from './components/pages/subpages/project/subpages/avanzara-especificaciones/avanzara-especificaciones.component';
import { AvanzaraValinternaComponent } from './components/pages/subpages/project/subpages/avanzara-valinterna/avanzara-valinterna.component';
import { AvanzaraValcalidadComponent } from './components/pages/subpages/project/subpages/avanzara-valcalidad/avanzara-valcalidad.component';
import { AvanzaraFabpriunidadComponent } from './components/pages/subpages/project/subpages/avanzara-fabpriunidad/avanzara-fabpriunidad.component';
import { AvanzaraValpriunidadComponent } from './components/pages/subpages/project/subpages/avanzara-valpriunidad/avanzara-valpriunidad.component';
import { AvanzaraDesarrolloComponent } from './components/pages/subpages/project/subpages/avanzara-desarrollo/avanzara-desarrollo.component';

import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FaseABarraPipe } from './pipes/fase-abarra.pipe';
import { FaseAFasePipe } from './pipes/fase-afase.pipe';
import { FaseAEstadoPipe } from './pipes/fase-aestado.pipe';
import { FechaAFormatoPipe } from './pipes/fecha-aformato.pipe';
import { ProyectoAFechaPipe } from './pipes/proyecto-afecha.pipe';
import { EstadoAprobacionPipe } from './pipes/estado-aprobacion.pipe';
import { ProyectoADocPruebasPipe } from './pipes/proyecto-adoc-pruebas.pipe';
import { ProyectoADocMantisPipe } from './pipes/proyecto-adoc-mantis.pipe';
import { ProyectoATestProbadoPipe } from './pipes/proyecto-atest-probado.pipe';
import { ProyectoAFabunidadunoPipe } from './pipes/proyecto-afabunidaduno.pipe';
import { ProyectoAValunidadunoPipe } from './pipes/proyecto-avalunidaduno.pipe';
import { UsersComponent } from './components/pages/subpages/users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTableModule, MatSortModule,MatPaginatorModule,MatFormFieldModule,MatSelectModule,MatListModule} from '@angular/material'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DefaultComponent,
    PagesComponent,
    LoginComponent,
    CreateProjectComponent,
    ListProjectsComponent,
    StatisticsComponent,
    ProfileComponent,
    DetailProjectComponent,
    ProjectComponent,
    BarraComponent,
    DocumentsComponent,
    ReportsComponent,
    LogComponent,
    BarraFasesComponent,
    FaseComponent,
    AvanzaraRecReqComponent,
    AvanzaraAnalisisComponent,
    AvanzaraAprobacionComponent,
    AvanzaraPlanificacionComponent,
    AvanzaraEspecificacionesComponent,
    AvanzaraValinternaComponent,
    AvanzaraValcalidadComponent,
    AvanzaraFabpriunidadComponent,
    AvanzaraValpriunidadComponent,
    AvanzaraDesarrolloComponent,
    FaseABarraPipe,
    FaseAFasePipe,
    FaseAEstadoPipe,
    FechaAFormatoPipe,
    ProyectoAFechaPipe,
    EstadoAprobacionPipe,
    ProyectoADocPruebasPipe,
    ProyectoADocMantisPipe,
    ProyectoATestProbadoPipe,
    ProyectoAFabunidadunoPipe,
    ProyectoAValunidadunoPipe,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    app_routing,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule, MatSortModule,MatPaginatorModule,MatFormFieldModule,MatSelectModule,MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
