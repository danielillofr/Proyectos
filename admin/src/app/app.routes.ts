import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './components/pages/subpages/default/default.component';
import { LoginComponent } from './components/login/login.component';
import { CreateProjectComponent } from './components/pages/subpages/create-project/create-project.component';
import { ListProjectsComponent } from './components/pages/subpages/list-projects/list-projects.component';
import { StatisticsComponent } from './components/pages/subpages/statistics/statistics.component';
import { ProfileComponent } from './components/pages/subpages/profile/profile.component';
import { DetailProjectComponent } from './components/pages/subpages/project/subpages/details/detail-project/detail-project.component';
import { ProjectComponent } from './components/pages/subpages/project/project/project.component';
import { DocumentsComponent } from './components/pages/subpages/project/subpages/documents/documents.component';
import { LogComponent } from './components/pages/subpages/project/subpages/log/log.component';
import { ReportsComponent } from './components/pages/subpages/project/subpages/reports/reports.component';
import { PagesComponent } from './components/pages/pages/pages.component';
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
import { PagesGuardGuard } from './guards/pages-guard.guard';


const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'pages', 
        component: PagesComponent,
        // canActivate: [PagesGuardGuard],
        children:[
            {path: '', component: DefaultComponent},
            {path: 'createproject', component: CreateProjectComponent},
            {path: 'listprojects', component: ListProjectsComponent},
            {path: 'statistics', component: StatisticsComponent},
            {path: 'profile', component: ProfileComponent},
            {path: 'project/:idProyecto', component: ProjectComponent,
                children:[
                    {path: '', component: DetailProjectComponent},
                    {path: 'detail', component: DetailProjectComponent,
                        children: [
                            {path:'fase/:fase', component: FaseComponent},
                        ]
                    },
                    {path: 'documents', component: DocumentsComponent},
                    {path:'log', component: LogComponent},
                    {path: 'reports', component: ReportsComponent},
                    {path: 'avanzararecreq', component: AvanzaraRecReqComponent},
                    {path: 'avanzaraanalisis', component: AvanzaraAnalisisComponent},
                    {path: 'avanzaraaprobacion', component: AvanzaraAprobacionComponent},
                    {path: 'avanzaraplanificacion', component: AvanzaraPlanificacionComponent},
                    {path: 'avanzaraespecificaciones', component: AvanzaraEspecificacionesComponent},
                    {path: 'avanzaradesarrollo', component: AvanzaraDesarrolloComponent},
                    {path: 'avanzaravalinterna', component: AvanzaraValinternaComponent},
                    {path: 'avanzaravalcalidad', component: AvanzaraValcalidadComponent},
                    {path: 'avanzarafabpriunidad', component: AvanzaraFabpriunidadComponent},
                    {path: 'avanzaravalpriunidad', component: AvanzaraValpriunidadComponent}
                ]
            },
            {path: '**', component: DefaultComponent}
        ] },
    { path: '**', component: LoginComponent },

];

export const app_routing = RouterModule.forRoot(routes);