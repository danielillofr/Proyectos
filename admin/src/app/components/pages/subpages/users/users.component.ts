import { Component, OnInit } from '@angular/core';
import { RespuestaListaUsuarios,TipoUsuario } from './../../../../interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';

declare function swal(titulo: String, mensaje: String ,tipo: String);


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usuarios: TipoUsuario[] = null;

  formCrearUsuario: FormGroup;


  constructor(private usuariosservice: UsuariosService) {
    console.log('Aqui estamos');
    this.formCrearUsuario = new FormGroup({
      nombre: new FormControl('', [Validators.required,Validators.minLength(3)]),
      nombreCompleto: new FormControl('', [Validators.required,Validators.minLength(3)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      clave: new FormControl('', [Validators.required, Validators.minLength(6)]),
      role: new FormControl('JEFEPROYECTO', [Validators.required])
    })

    usuariosservice.soliticar_usuarios()
      .subscribe((respuesta: RespuestaListaUsuarios)=>{
        if (respuesta.ok == false) {
          console.log('Error obteniendo listado de usuarios')
          swal('Error','Error obteniendo usuarios','error')
        }else{
          console.log('usuarios:', respuesta.usuarios)
          this.usuarios = respuesta.usuarios;
        }
      },(err)=>{
        swal('Error','Error obteniendo usuarios','error')
      })

   }

  Guardar() {
    console.log(this.formCrearUsuario.value);
    this.usuariosservice.crearUsuario(this.formCrearUsuario.value)
      .then((usuarios: TipoUsuario[]) => {
        console.log('Usuario creado')
        this.usuarios = usuarios;
        this.formCrearUsuario.reset();
        swal('Ok','Usuario creado correctamente','success')
      })
      .catch((err)=>{
        console.log('Error creando usuario',err);
        swal('Error','Error creando usuarios','error')

      })
  } 
  ngOnInit() {
  }

}
