import { Component, OnInit, AfterContentChecked, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from './../../../../services/usuarios.service';
import { TipoUsuario, RespuestaListaUsuarios } from './../../../../interfaces/usuario.interface';
import { ProyectosService } from './../../../../services/proyectos.service';
import { Router } from '@angular/router';
import { AlertPromise } from 'selenium-webdriver';




declare function $(any);

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styles: []
})
export class CreateProjectComponent implements AfterContentChecked {
  
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
          alert('Error obteniendo usuarios')
        }else{
          this.usuarios = listaUsuarios.usuarios;
          console.log(this.usuarios);
        }
      })

   }
  Guardar() {
    var date_input=$('input[name="fechaPrevista"]'); //our date input has the name "date"
    this.formCrearProyecto.controls['fechaPrevista'].setValue(date_input.val());

    const proyecto:any = {
      nombre: this.formCrearProyecto.controls['nombre'].value,
      descripcion: this.formCrearProyecto.controls['descripcion'].value,
      jefeProyecto: this.formCrearProyecto.controls['jefeProyecto'].value,
      fechaPrevista: this.formCrearProyecto.controls['fechaPrevista'].value
    }
    this.proyectoservice.Crear_proyecto(proyecto)
      .subscribe(proyecto=>{
        console.log(proyecto);
        this.router.navigate(['/pages']);
      }, err=>{
        console.log('Error:',err)
        
      })

  }

  ngOnInit() {
    //initDatePicker();
  }

  ngAfterContentChecked() {
    var date_input=$('input[name="fechaPrevista"]'); //our date input has the name "date"
    // console.log(date_input);
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
    console.log(event);
  }

}
