import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosBeneficiarioComponent } from './datos-beneficiario.component';
import { ReactiveFormsModule} from '@angular/forms';
import { InputFieldModule } from '@mre/comunes';



@NgModule({
  declarations: [
    DatosBeneficiarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFieldModule
  ],
  exports:[DatosBeneficiarioComponent]
})
export class DatosBeneficiarioModule {
  
 }
