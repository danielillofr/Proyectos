import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from './../services/usuarios.service';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class PagesGuardGuard implements CanActivate {

  constructor(private router:Router, private usuarioservice: UsuariosService){}

  canActivate() {
    if (this.usuarioservice.logueado) {
      console.log('Como está logueado, pasa el guard');
      return true;
    }else{
      this.router.navigate(['/']);
      console.log('Como no está logueado, no pasa el guard');
      return false;
    }
  }
  
}
