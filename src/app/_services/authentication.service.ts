import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserRegistrationRequest } from '../_models';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient,   private router: Router,) { }

    login(emailId: string, password: string) {


        const headers = new HttpHeaders(
            emailId && password ? {
              authorization:'Basic ' + btoa(emailId + ':' + password)
            }:{}
          );

        return this.http.get<any>(`${environment.apiUrl}/users/login`
        , {headers:headers, withCredentials:true}
        )
            .pipe(map(user => {
               
                if (user ) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    console.log("user is " + JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }
}