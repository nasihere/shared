import {Component} from 'angular2/core'

@Component({
    selector: 'submitbutton',
    template: `
       <button on-click=onClick($event)>Submit</button>
       <div (click)=onDivClick()>OnDiv Click
        <button (click)="onClick($event)">Click</button>
       
       </div>
                `
})
export class SubmitButtonComponent { 
  isActive = false;
  onDivClick(){
      console.log("handled by div");
  }
  onClick($event){
      $event.stopPropagation();
      console.log("clicked", $event);
  }
}