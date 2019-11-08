import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './../../services/usuarios.service';
import { TipoUsuario, RespuestaListaUsuarios,RespuestaTipoLogin } from './../../interfaces/usuario.interface';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usuarioservice: UsuariosService, private router: Router) { }

  ngOnInit() {
  }

  Loguearse = () => {
    this.usuarioservice.solicitar_token('dfernandez','123456')
      .subscribe((datos)=>{
        const respuesta:RespuestaTipoLogin = <RespuestaTipoLogin>datos;
        if (respuesta.ok === false) {
          if (respuesta.errBaseDatos) {
            console.log('Error accediendo a la base de datos');
          } else {
            console.log(respuesta.err);
          }
          alert('Error');
          return;
        }
        this.usuarioservice.token = respuesta.token;
        this.usuarioservice.logueado = true;
        this.usuarioservice.usuarioApp = <TipoUsuario>respuesta.usuario;
        console.log(this.usuarioservice.usuarioApp);
        this.router.navigate(['/pages']);
      }, (err) => {
        console.log('Error accediendo a la base de datos');
      });
    }

}
