import {Component} from 'angular2/core';
import {CoursesComponent} from './courses.component';
import {SubmitButtonComponent} from './buttons.component';
import {AuthorsComponent} from './authors.component';
@Component({
    selector: 'my-app',
    template: `<h1>Hello Angular Welcome Nasir</h1>
                <submitbutton></submitbutton>
                <courses></courses>
                <authors></authors>`, 
    directives: [CoursesComponent,AuthorsComponent,SubmitButtonComponent]
})
export class AppComponent { }