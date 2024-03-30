import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Obtém o token do usuário do localStorage
    const userString = localStorage.getItem("USER");
    const token = userString ? JSON.parse(userString).token : null;
    // Verifica se há um token e adiciona-o ao cabeçalho da solicitação
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(authReq);
    }

    // Se não houver token, continua a solicitação original
    return next.handle(req);
  }
}
