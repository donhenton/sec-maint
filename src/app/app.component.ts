import { Component, OnInit } from '@angular/core';
import { MenuDirective } from './components/dropdown/menu.directive';
import { DropdownDirective } from './components/dropdown/dropdown.directive';
import { ErrorService, ERROR_MESSAGE_TYPE } from './services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  errorMessage = '';
  constructor (private errorService: ErrorService) {

  }

  detectMenuOutsideClick(ev) {
    // console.log("responding in app.component "+ev)
     // this has been wired up as a demo of picking up events from directives
   }

   ngOnInit() {

    this.errorService.getErrorSubject().subscribe(message => {
     // console.log(message);
      if (message.type === ERROR_MESSAGE_TYPE.ERROR ) {
        this.errorMessage = message.text;
      } else {

        this.errorMessage = '' ;
      }

    });

   }

}


