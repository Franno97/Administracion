import { Component, Inject, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UnidadAdministrativaService,  UnidadAdministrativaFuncionalDto } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/unidad-administrativa';
import { ActivatedRoute } from '@angular/router';
import { CargoLookupDto, CargoService } from '@mre/administrative-unit/proxy/mre/sb/unidad-administrativa/servicio';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { finalize } from 'rxjs/operators';

import { GetIdentityUsersInput, IdentityUserDto, IdentityUserService, UserType} from '@proxy/volo/abp/identity/index';
import { UsuarioService } from '@proxy/identidad/usuario.service';
import { TABLA_MAXIMO_RESULTADO } from '@mre/comunes';

@Component({
  selector: 'lib-add-functionary',
  templateUrl: './add-functionary.component.html',
  styleUrls: ['./add-functionary.component.css'],
  providers: [ListService]
})
export class AddFunctionaryComponent implements OnInit {
  functionary = { items: [], totalCount: 0 } as PagedResultDto<UnidadAdministrativaFuncionalDto>
  filteredfunctionaries = { items: [], totalCount: 0 } as PagedResultDto<any>
  position : CargoLookupDto [];
  submitted = false;
  form: FormGroup;

  isModalOpen = false;
  isModalOpenSearch = false;
  administrativeUnitId = '';
  administrativeUnitName = '';
  modalBusy = false;

  constructor(
    private route: ActivatedRoute,
    private administrativeUnitService: UnidadAdministrativaService,
    private positionService: CargoService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    private identityUserService: IdentityUserService,
    private usuarioService: UsuarioService) {
    }

  ngOnInit(): void {
    this.administrativeUnitId = this.route.snapshot.params.id;
    this.administrativeUnitName = this.route.snapshot.params.name;


    this.obtenerLista();

  }
 
  obtenerLista(){

    this.administrativeUnitService.obtenerFuncionales(this.administrativeUnitId).subscribe((functionaries) => {

      //Obtener datos de usuarios
      let userIds = functionaries.items.map(({ usuarioId }) => usuarioId);

      this.usuarioService.obtenerLista(userIds).subscribe((response) => {
        functionaries.items.forEach(item => {
          item.nombre = response.find(u => u.id == item.usuarioId).name;
          item.apellido = response.find(u => u.id == item.usuarioId).surname;
        });

          this.functionary = functionaries;
      });

    });
  }
 

  addFunctionary() {
    this.buildForm()
    this.isModalOpen = true;

    this.positionService.getLookup().subscribe((response) => {
      this.position = response.items;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(0),
        Validators.maxLength(256)]],
      nombre: ['',],
      usuarioId: ['',[Validators.required]],
      cargoId: [null, Validators.required]
    });
  }

  save() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.modalBusy = true;

    this.administrativeUnitService.agregarFuncional(this.administrativeUnitId, this.form.value)
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.isModalOpen = false;
        this.form.reset();
        this.submitted = false;
        this.obtenerLista();
      });
  }

  removeFunctionary(idFunctionary: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.administrativeUnitService.eliminarFuncional(this.administrativeUnitId, idFunctionary).subscribe(() => {
          this.obtenerLista();
        })
      }
    });

    
  }

  searchFunctionary(){
    let username = this.form.get('usuario').value


    const input = {} as GetIdentityUsersInput;
    input.filter = username;
    input.userType = UserType.Internal;

    this.identityUserService.getList(input).subscribe((functionary) => {
      this.filteredfunctionaries = functionary;
      this.isModalOpenSearch = true;

    });
  }

  selectFunctionary(userId:string, name: string, surname: string, username: string){
    this.form.controls['nombre'].setValue(name.concat(' ',surname));
    this.form.controls['usuarioId'].setValue(userId);
    this.form.controls['usuario'].setValue(username);
    this.isModalOpenSearch = false;
  }

}
