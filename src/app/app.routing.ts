import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { LogoutComponent } from './logout/logout.component'
import { PostComponent } from './post/post.component'
import { AuthGuard } from './_guards';
import { CommentComponent } from './comment/comment.component';

const appRoutes: Routes = [
    { path: '', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'post', component: PostComponent },
    { path: 'comment', component: CommentComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);