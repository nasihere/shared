import {Directive, ElementRef, Renderer,Input} from 'angular2/core'


@Directive({
        selector: '[autoGrow]',
    host:{
      '(focus)': 'onFocus()',
    '(blur)': 'onBlur()'
    }
})
export class AutoGrowDirective {
    
    constructor(private el: ElementRef){
        
    }
   onFocus() { this._highlight("yellow"); }
      onBlur() { this._highlight(null); }
      
  private _highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }


}