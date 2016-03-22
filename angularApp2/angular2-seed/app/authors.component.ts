import {Component} from 'angular2/core'
import {AuthorService} from './author.service'

@Component({
    selector: 'authors',
    template: `
                <h2>Authors</h2>
                <ul>
                    <li *ngFor="#author of authors">{{author}}</li>
                </ul>
                
                `,
    providers: [AuthorService]
    
})
export class AuthorsComponent { 
    title: string = 'The title of current page';
    authors: Array<string> = [];// CourseService.getCourses();     
    constructor(authorService: AuthorService){
         this.authors = authorService.getAuthors();
   }
}