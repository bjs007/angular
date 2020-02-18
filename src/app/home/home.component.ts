import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../_models';
import { UserService, PostService } from '../_services';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// import { NgxSpinnerService } from 'ngx-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { error } from 'protractor';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    allpost;
    notscrolly = true;
    notEmptyPost = true;



    constructor(private postService : PostService, private userService: UserService, private http: HttpClient, private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    }

    ngOnInit() {
        if(!this.currentUser){
          this.router.navigate(['/login']);
        }else{
         
          // this.allpost =  this.postService.loadInitPost();

        // this.loadInitPost();
        // console.log("Inside home component" + localStorage.getItem('currentUser'));
        }
        
    }

    // load the Initial 6 posts
  loadInitPost() {
    const url = 'http://localhost:8080/post/user/questions'
    
    const emailId = JSON.parse(localStorage.getItem('currentUser'))['emailId'];
    console.log("email id  is  " + emailId);
    this.http.get(url,  {
      params : {
        'emailId' : JSON.parse(localStorage.getItem('currentUser'))['emailId']
      }

    }).subscribe(data => {
      // this.allpost = data;
      this.allpost = data;
      console.log(this.allpost);
    }, error => {console.log(error)});
  }

  onClick(slug: String){
    console.log(slug);
    this.router.navigate(['comment', {slug: slug}]);
  }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }

    onScroll() {
        if (this.notscrolly && this.notEmptyPost) {
        //   this.spinner.show();
          this.notscrolly = false;
          // this.loadNextPost();
       }
      // console.log("scrolled");
      // this.spinner.show();
      }


    loadNextPost() {
      console.log("Inside load");
        const url = 'http://tlino.96.lt/api/getnextpost';
        // return last post from the array
        const lastPost = this.allpost[this.allpost.length - 1];
        // get id of last post
        //  backend of this app use this id to get next 6 post
        const lastPostId = lastPost.id;
        // sent this id as key value pare using formdata()
        const dataToSend = new FormData();
        dataToSend.append('id', lastPostId);
        // call http request
        this.http.post(url, dataToSend)
        .subscribe( (data: any) => {
     
           const newPost = data[0];
     
        //    this.spinner.hide();
     
           if (newPost.length === 0 ) {
             this.notEmptyPost =  false;
           }
           // add newly fetched posts to the existing post
           this.allpost = this.allpost.concat(newPost);
     
           this.notscrolly = true;
         });
      }
      


}