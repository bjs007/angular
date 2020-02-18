import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {

  slug;
  answers;
  constructor(private route: ActivatedRoute, private http: HttpClient) { 
    this.slug = this.route.snapshot.params.slug;
  }
  

  ngOnInit() {
 
  this.loadAnswers();
  }

  loadAnswers(){
    const url = 'http://localhost:8080/post/user/comment'

    console.log("slug id is  " + this.slug);
    this.http.get(url,  {
      params : {
        'slug' : this.slug
      }

    }).subscribe(data => {
      this.answers = data;
      console.log(this.answers);
    }, error => {return;});
  }

}
