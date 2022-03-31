import { Rest, RestService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { ConfirmarValidator } from '../../validators/confirmar.validator';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { ConfigurarFirmaElectronicaService } from '../../services/configurar-firma-electronica.service';

@Component({
  selector: 'lib-mi-firma-electronica',
  templateUrl: './mi-firma-electronica.component.html',
  styleUrls: ['./mi-firma-electronica.component.css']
})
export class MiFirmaElectronicaComponent implements OnInit {

  
  extensionesAceptadas = ".p12";
 
  form: FormGroup;
  
  archivoSeleccionado:File;

  existeConfiguracion = false;
  permitirConfigurar = false;
  consultando = false;

  isModalOpen = false;
  modalBusy = false;
  submitted = false;

  constructor(
    private configurarFirmaElectronicaService:ConfigurarFirmaElectronicaService,
    private fb: FormBuilder,
    private toasterService: ToasterService,
    private confirmation: ConfirmationService) { }

  ngOnInit(): void {

    this.consultando = true;

    this.configurarFirmaElectronicaService.permitida()
      .pipe(finalize(() => (this.consultando = false)))
      .subscribe((resultado) => {
        this.permitirConfigurar = resultado; 

        if (this.permitirConfigurar){

          this.verificarExistencia();

        } 
      });

  }

  verificarExistencia(){
    this.consultando = true;
 
    this.configurarFirmaElectronicaService.existe()
      .pipe(finalize(() => (this.consultando = false)))
      .subscribe((resultado) => {
         
        this.existeConfiguracion = resultado;

      }); 

  }
  agregarConfiguracion() {
   
    this.buildForm();
    this.isModalOpen = true;
  }

  

  buildForm() {
    this.form = this.fb.group({
      claveFirma: [null, [Validators.required,
         Validators.minLength(0),
         Validators.maxLength(256)]],
       confirmarClaveFirma: [null, [Validators.required,
          Validators.minLength(0),
          Validators.maxLength(256)]],
      archivoFirma: [null, Validators.required]
    },{
      validator: ConfirmarValidator('claveFirma', 'confirmarClaveFirma')
    }); 
  }

  onFileChanged(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.archivoSeleccionado = file; 
      this.form.patchValue({
        archivoFirma: file,
      });
    }else{
      this.archivoSeleccionado = null;
    }
  }
 

  guardar() {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.modalBusy = true;

    const archivoSubir = <File>this.form.value["archivoFirma"]; 
    const claveFirma = <File>this.form.value["claveFirma"]; 
    
    
    const formData = new FormData();
    formData.append('archivoFirma', archivoSubir, archivoSubir.name);
    formData.append('claveFirma', claveFirma);


    this.configurarFirmaElectronicaService.AgregarMiFirma(formData)
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.isModalOpen = false;
        this.submitted = false;
        this.form.reset();
        this.archivoSeleccionado = null;
        this.toasterService.success('::GuardarOk');
        this.verificarExistencia();
      });
     
  }


  eliminarConfiguracion(){

    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      
      if (status === Confirmation.Status.confirm) {
        
        this.submitted = true;

        this.configurarFirmaElectronicaService.borrarMiFirma()
          .pipe(finalize(() => (this.modalBusy = false)))
          .subscribe(() => {
          
            this.archivoSeleccionado = null;
            this.submitted = false; 
            this.toasterService.success('::EliminarOk');
            this.verificarExistencia();
          });

      } 

    });


    
  }

}
