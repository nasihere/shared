import {Component} from 'angular2/core'

@Component({
    selector: 'submitbutton',
    template: `
       <button (click)="onClick()">Click</button>
       <button on-click=onClick()>Submit</button>
                `
})
export class SubmitButtonComponent { 
  isActive = false;
  onClick(){
      alert("hi")
  }
}