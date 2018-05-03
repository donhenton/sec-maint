import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from './alert-items/alert.service';
import { AlertComponent } from './alert-items/alert.component';

/**
 * https://alligator.io/angular/providers-shared-modules/
 * Pipes and directives are in the declarations and exports section
 * Providers are exported via the ModuleWithProviders interface
 * This is to prevent multiple copies of the provider
 *
 */
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AlertComponent
  ],

  exports: [AlertComponent, CommonModule]
})
export class AlertMainModule {


  static forRoot(): ModuleWithProviders {
    return {
      ngModule:  AlertMainModule ,
      providers: [ AlertService ]
    };
  }




 }
