import { Component, Inject, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { UsuarioService } from '@proxy/identidad/usuario.service';
import { GetUnidadAdministrativaServicioInput, SignatarioDto, UnidadAdministrativaFuncionalDto, UnidadAdministrativaService, UnidadAdministrativaServicioDto } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/unidad-administrativa';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';
import { ConfigurarFirmaElectronicaService } from '@mre/administrative-unit';

@Component({
  selector: 'lib-add-signer',
  templateUrl: './add-signer.component.html',
  styleUrls: ['./add-signer.component.css'],
  providers: [ListService],
})
export class AddSignerComponent implements OnInit {

  administrativeUnitServices: UnidadAdministrativaServicioDto[];

  signer = {items: [], totalCount: 0} as PagedResultDto<SignatarioConUsuarioDto>

  functionary: UnidadAdministrativaFuncionalConUsuarioDto[];
  
  submitted = false;

  modalBusy = false;

  form: FormGroup;

  isModalOpen = false;
  administrativeUnitId = '';
  administrativeUnitName = '';

  constructor(
    private administrativeUnitService: UnidadAdministrativaService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    private usuarioService: UsuarioService,
    private configurarFirmaElectronicaService: ConfigurarFirmaElectronicaService) {
     
    }

  ngOnInit(): void {
    this.administrativeUnitId = this.route.snapshot.params.id;
    this.administrativeUnitName = this.route.snapshot.params.name;
    this.getSigners(this.administrativeUnitId);
  }

  private getSigners(administrativeUnitId: string){
    this.administrativeUnitService.obtenerSignatarios(administrativeUnitId).subscribe((signatarios) => {
     
      let signatarioConUsuarioLocal = {items: [], totalCount: 0} as PagedResultDto<SignatarioConUsuarioDto>;
      signatarioConUsuarioLocal.items = signatarios.items.map(item => ({...item, nombres:"",apellidos:"" }));
      signatarioConUsuarioLocal.totalCount = signatarios.totalCount;

      
      //Obtener datos de usuarios
      let userIds = signatarios.items.map(({ usuarioId }) => usuarioId); 
      
      this.usuarioService.obtenerLista(userIds).subscribe((response) => {
        
        signatarioConUsuarioLocal.items.forEach(item => {
          item.nombres = response.find(u => u.id == item.usuarioId).name;
          item.apellidos = response.find(u => u.id == item.usuarioId).surname;
        });

        this.signer = signatarioConUsuarioLocal;

      });
  
    })
  }

  addSigner(){
    
    this.administrativeUnitService.obtenerFuncionales(this.administrativeUnitId).subscribe((functionaries) => {
      //Obtener datos de usuarios
      let userIds = functionaries.items.map(({ usuarioId }) => usuarioId);

      let funcionariosLocal: UnidadAdministrativaFuncionalConUsuarioDto[];
  
      funcionariosLocal = functionaries.items.map(item => ({...item, usuarioExiste:false}));
     
      this.usuarioService.obtenerLista(userIds).subscribe((response) => {
        funcionariosLocal.forEach(item => {
          let usuario = response.find(u => u.id == item.usuarioId);
          if (usuario){
            item.nombre = usuario.name;
            item.apellido = usuario.surname;
            item.usuarioExiste =  true;
          }
        }); 

        this.functionary = funcionariosLocal;
        
      });  
    });

    //TODO: Si existe una gran cantidad registros, es mejor utilizar
    //un Typeahead
    const input = {} as GetUnidadAdministrativaServicioInput; 
    input.activo = true;

    
    this.administrativeUnitService.obtenerServicios(this.administrativeUnitId, input).subscribe((services) => {
      this.administrativeUnitServices = services.items;
    });
    

    this.buildForm()
    this.isModalOpen = true;
  }

  buildForm() {
    this.form = this.fb.group({
      servicioId: [null, Validators.required],
      usuarioId: [null, Validators.required],
      porDefecto: [false]
    });
  }

  save() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    
    this.modalBusy =true;
    this.administrativeUnitService.agregarSignatario(this.administrativeUnitId, this.form.value)
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.form.reset();
        this.isModalOpen = false;
        this.submitted = false;
        this.getSigners(this.administrativeUnitId);
      });
  }

  removeSigner(functionaryId: string, serviceId: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.administrativeUnitService.eliminarSignatario(this.administrativeUnitId, functionaryId, serviceId).subscribe(() => {
          this.getSigners(this.administrativeUnitId);
        });
      }
    });
  }

  eliminarFirmaElectronica(unidadAdministrativaId: string, usuarioId: string, servicioId: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.configurarFirmaElectronicaService.borrarFirmaElectronica(this.administrativeUnitId, usuarioId, servicioId).subscribe(() => {
          this.getSigners(this.administrativeUnitId);
        });
      }
    });
  }
 
}


export interface SignatarioConUsuarioDto extends SignatarioDto {
  nombres: string;
  apellidos: string;
}

/**
 * Objeto para unir informacion funcionarios con usuarios
 */
export interface UnidadAdministrativaFuncionalConUsuarioDto extends UnidadAdministrativaFuncionalDto {
  usuarioExiste: boolean;
}
