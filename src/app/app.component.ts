import { Component } from '@angular/core';
import { MenuDirective } from './components/dropdown/menu.directive';
import { DropdownDirective } from './components/dropdown/dropdown.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';


  detectMenuOutsideClick(ev) {
    // console.log("responding in app.component "+ev)
     // this has been wired up as a demo of picking up events from directives
   }
}
