import { Component, OnInit } from '@angular/core';
import { LogsService } from 'src/app/services/logs.service';
import { Router } from '@angular/router';

declare function swal(titulo: String, mensaje: String ,tipo: String);

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styles: []
})
export class DefaultComponent implements OnInit {

  logsCargados: boolean = false;

  constructor(public logsservice: LogsService, private router: Router) {
    //Solicitamos los logs
    logsservice.Obtener_ultimos_logs()
      .then(()=>{
        this.logsCargados = true;
      })
      .catch(()=>{
        swal('Error','Error obteniendo logs', 'error')
          .then(()=>{
            this.router.navigate(['/pages'])
          })     
      })

   }

  ngOnInit() {
  }

}
