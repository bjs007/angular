import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { LogoutComponent } from './logout/logout.component'
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'logout', component: LogoutComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);