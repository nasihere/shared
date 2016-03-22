import {Component} from 'angular2/core';
import {CoursesComponent} from './courses.component';
import {SubmitButtonComponent} from './buttons.component';
import {AuthorsComponent} from './authors.component';
@Component({
    selector: 'my-app',
    template: `<h1>Hello Angular Welcome Nasir</h1>
                <input type="text" [value]="title" [(ngModel)]="title"/>
                Preview: {{title}}
                <input type="button" value="Clear" (click)="title=''"/>
                
                <submitbutton></submitbutton>
                <courses></courses>
                <authors></authors>`, 
    directives: [CoursesComponent,AuthorsComponent,SubmitButtonComponent]
})
export class AppComponent { }