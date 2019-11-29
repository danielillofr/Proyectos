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
      return true;
    }else{
      this.router.navigate(['/']);
      return false;
    }
  }
  
}
