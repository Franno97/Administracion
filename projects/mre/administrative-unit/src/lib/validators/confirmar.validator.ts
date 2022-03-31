import { FormGroup } from '@angular/forms';
    
export function ConfirmarValidator(controlNombre: string, verificarControlNombre: string){
    return (formGroup: FormGroup) => {
        
        const control = formGroup.controls[controlNombre];
        const verificarControl = formGroup.controls[verificarControlNombre];
        
        if (verificarControl.errors && !verificarControl.errors.confirmacion) {
            return;
        }
       
        if (control.value !== verificarControl.value) {

          verificarControl.setErrors({ confirmacion: true });
 
        } else {
          verificarControl.setErrors(null);
        }
    }
}