import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  templateUrl: 'logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor( private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.logout();
  }

  logout() {
    const url = 'http://localhost:8080/users/logout';
    console.log("Trying to logout");
    this.http.post(url, {}).pipe(
      map(response => {
        console.log("Reponse recieved ");
        console.log(response);
       
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
        
      })
    );

   
  }


}
