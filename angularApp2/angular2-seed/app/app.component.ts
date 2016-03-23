import {Component} from 'angular2/core';
import {CoursesComponent} from './courses.component';
import {SubmitButtonComponent} from './buttons.component';
import {AuthorsComponent} from './authors.component';
import {StarComponent} from './star.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {RouteConfig} from 'angular2/router';

@Component({
    selector: 'my-app',
    template: `
                <header>
                    <nav>
                        <a [routerLink]="['Contact']">Contacts</a>
                        <a [routerLink]="['NewContact']">New Contacts</a>
                    </nav>
                </header>
                <div class="main">
                    <router-outlet></router-outlet>
                </div>
                `, 
    directives: [CoursesComponent,AuthorsComponent,SubmitButtonComponent,StarComponent,ROUTER_DIRECTIVES]
})

@RouteConfig([
    {path: '/contact', name: 'Contact', component: CoursesComponent},   
    {path: '/newcontact', name: 'NewContact', component: AuthorsComponent}   
])
export class AppComponent { }