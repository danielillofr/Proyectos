import { Component, OnInit, ViewChild } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { MatSort } from '@angular/material/sort';


declare function swal(titulo: String, mensaje: String ,tipo: String);


@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styles: []
})
export class ListProjectsComponent implements OnInit {
  proyectos: any[] = null;
  datos;// = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = ['nombre', 'progreso','fase','vencimiento','acceder'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('lista', {static: true}) zapatos: any;
  typesOfShoes: string[] = ['Recopilando', 'Analizando', 'Aprobando', 'Planificando', 'Especificando', 'Desarrollando',
                            'Validando Int',' Validando Cal','Fabricando 1ª','Validando 1ª','Completado'];
  opciones: any;
  faseAMostrar:boolean[] = [false,false,false,false,false,false,false,false,false,false,false];
  mostrarFiltros: boolean = false;
  constructor(private proyectosservice: ProyectosService, private router:Router) {
    proyectosservice.Obtener_proyectos()
      .subscribe((datos) => {
        const respuesta: any = datos;
        if (respuesta.ok === false) {
          swal('Error', 'Error obteniendo el listado de proyectos','error')
            .then(()=>{
              router.navigate(['/pages']);
            })
        }else{
          this.proyectos = respuesta.proyectos;
          console.log(this.proyectos);
          this.datos = new MatTableDataSource(this.proyectos);
          this.datos.paginator = this.paginator;
          this.datos.sortingDataAccessor = (item, property) => {
            switch (property) {
                case 'vencimiento':
                    return new Date(item.fechaPrevista).getTime()
    
                default:
                    return item[property]
            }
    }          
          this.datos.sort = this.sort;
      
        }
      },(err)=>{
        swal('Error', 'Error obteniendo el listado de proyectos','error')
        .then(()=>{
          router.navigate(['/pages']);
        })
      })
  }
  applyFilter(filterValue: string) {
    this.datos.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {

  }

  listaCambiada(valores) {
    for (let i=0; i<11;i++) {
      this.faseAMostrar[i] = this.zapatos.options._results[i]._selected;
    }
    console.log(this.faseAMostrar);
    let proyectosFiltrados: any[]=[];
    for (let i=0; i < this.proyectos.length; i++) {
      if ((this.faseAMostrar[this.proyectos[i].fase]) == false) {
        proyectosFiltrados.push(this.proyectos[i]);
      }
    }
    this.datos.data = proyectosFiltrados;

  }

  invertirMostrarFiltro() {
    if(this.mostrarFiltros){
      this.mostrarFiltros = false;
    }else{
      this.mostrarFiltros = true
    }
  }
}
