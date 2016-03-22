import {Component} from 'angular2/core';
import {CoursesComponent} from './courses.component';

@Component({
    selector: 'my-app',
    template: '<h1>Hello Angular Welcome Nasir</h1><courses></courses>', 
    directives: [CoursesComponent]
})
export class AppComponent { }