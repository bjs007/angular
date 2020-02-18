import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class PostService {

    constructor(private http: HttpClient,   private router: Router,) { }

   loadInitPost() { 
    return this.http.get<any>(`${environment.apiUrl}/post/user/questions`,  {
      params : {
        'emailId' : JSON.parse(localStorage.getItem('currentUser'))['emailId']
      }

    }).pipe(map(posts =>{
      if(posts){
        return posts;
      }
    }));
  }

}