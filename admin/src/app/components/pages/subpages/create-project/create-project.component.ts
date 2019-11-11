import { Component, OnInit, AfterContentChecked, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from './../../../../services/usuarios.service';
import { TipoUsuario, RespuestaListaUsuarios } from './../../../../interfaces/usuario.interface';
import { ProyectosService } from './../../../../services/proyectos.service';
import { Router } from '@angular/router';
import { AlertPromise } from 'selenium-webdriver';




declare function $(any);
declare function swal(titulo: String, mensaje: String ,tipo: String);

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styles: []
})
export class CreateProjectComponent implements AfterContentChecked {

  Intercambiar_fecha = (fechaEuropa: string) => {
    let b = fechaEuropa.split('/');
    let fechaBD: string = b[1] + '/' + b[0] + '/' + b[2];
    return fechaBD;
  }

  formCrearProyecto: FormGroup;
  usuarios: TipoUsuario[] = null;
  constructor(private usuarioservice: UsuariosService, private proyectoservice: ProyectosService, private router:Router) {
    this.formCrearProyecto = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(2)]),
      jefeProyecto: new FormControl('', [Validators.required, Validators.minLength(2)]),
      fechaPrevista: new FormControl('', [Validators.required, Validators.minLength(2)]),

    })

    usuarioservice.soliticar_usuarios()
      .subscribe(usuarios=>{
        const listaUsuarios: RespuestaListaUsuarios = <RespuestaListaUsuarios>usuarios;
        if (listaUsuarios.ok === false) {
          console.log(listaUsuarios.err);
          swal('Error','Error obteniendo usuarios','error')
            .then(()=>{
              this.router.navigate(['/pages'])
            })
        }else{
          this.usuarios = listaUsuarios.usuarios;
          console.log(this.usuarios);
        }
      }, (err)=>{
        console.log(err);
        swal('Error','Error obteniendo usuarios','error')
        .then(()=>{
          this.router.navigate(['/pages'])
        })        
      })

   }
  Guardar() {
    var date_input=$('input[name="fechaPrevista"]'); //our date input has the name "date"

    const proyecto:any = {
      nombre: this.formCrearProyecto.controls['nombre'].value,
      descripcion: this.formCrearProyecto.controls['descripcion'].value,
      jefeProyecto: this.formCrearProyecto.controls['jefeProyecto'].value,
      fechaPrevista: this.Intercambiar_fecha(this.formCrearProyecto.controls['fechaPrevista'].value)
    }
    this.proyectoservice.Crear_proyecto(proyecto)
      .subscribe(datos=>{
        const respuesta: any = datos;
        if (respuesta.ok === false)
        {
          swal('Error creando proyecto','No se ha podido crear el proyecto', 'error');
          console.log('Error:', respuesta.err);
        }else{
          swal('Proyectos', 'Proyecto creado correctamente', 'success')
            .then(()=>{
              this.router.navigate(['/pages']);
            })
        }
      }, err=>{
        swal('Error creando proyecto','No se ha podido crear el proyecto', 'error');
        console.log('Error:',err)
        
      })

  }

  ngOnInit() {
    //initDatePicker();
  }

  ngAfterContentChecked() {
    console.log(this.formCrearProyecto);
    var date_input=$('input[name="fechaPrevista"]'); //our date input has the name "date"
    console.log(date_input);
    this.formCrearProyecto.controls['fechaPrevista'].setValue(date_input.val());
    var container="body";//$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    date_input.datepicker({
        format: "dd/mm/yyyy",
        language: "es",
        container: container,
        todayHighlight: true,
        autoclose: true,
    })
  }

  cambiado(event) {
    console.log('Evento:', event);
  }

}
