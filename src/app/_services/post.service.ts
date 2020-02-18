import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

@Injectable()
export class PostService {
  allpost;

    constructor(private http: HttpClient,   private router: Router,) { }

   loadInitPost() { 
    this.http.get(`${environment.apiUrl}/post/user/questions`,  {
      params : {
        'emailId' : JSON.parse(localStorage.getItem('currentUser'))['emailId']
      }

    }).subscribe(data => {
      this.allpost = data;
      console.log(this.allpost);
    }, error => {return;});
  }

  getPost(){return this.allpost;}
}