import { Component } from '@angular/core';

@Component({
  selector: 'common-directive',
  templateUrl: 'common-directive.html'
})
export class CommonDirectiveComponent {
  constructor() {
    console.log('Hello CommonDirectiveComponent Component')
  }

}
