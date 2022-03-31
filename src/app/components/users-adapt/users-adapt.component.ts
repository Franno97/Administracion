import { ListService, PagedResultDto,ABP,ConfigStateService  } from '@abp/ng.core';

import {
  UsersComponent,
  eIdentityComponents
} from '@abp/ng.identity';

//Proxy identity Custom
import {
  GetIdentityUsersInput,
  IdentityRoleDto,
  IdentityUserDto,
  IdentityUserService,
  userTypeOptions,
  UserType
} from '@proxy/volo/abp/identity/index'


import {
  UsuarioService
} from '@proxy/identidad/index'

import {
  UsuarioLdapService
} from '@proxy/mre/sb/ldap/index'


import { ePermissionManagementComponents } from '@abp/ng.permission-management';
import { Confirmation, ConfirmationService,ToasterService   } from '@abp/ng.theme.shared'; 
import {
  EXTENSIONS_IDENTIFIER,
  FormPropData,
  generateFormFromProps,
} from '@abp/ng.theme.shared/extensions';
import {
  Component,
  Injector,
  OnInit,
  TemplateRef,
  TrackByFunction,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'abp-users',
  templateUrl: './users-adapt.component.html',
  providers: [
    ListService,
    {
      provide: EXTENSIONS_IDENTIFIER,
      useValue: eIdentityComponents.Users,
    },
    { provide: UsersComponent, useExisting: UsersAdaptComponent },
  ],
})
export class UsersAdaptComponent implements OnInit {
  data: PagedResultDto<IdentityUserDto> = { items: [], totalCount: 0 };

  @ViewChild('modalContent', { static: false })
  modalContent: TemplateRef<any>;

  form: FormGroup;

  selected: IdentityUserDto;

  selectedUserRoles: IdentityRoleDto[];

  roles: IdentityRoleDto[];

  visiblePermissions = false;

  providerKey: string;

  isModalVisible: boolean;

  modalBusy = false;

  obtenerUsuarioOcupado = false;

  permissionManagementKey = ePermissionManagementComponents.PermissionManagement;

  trackByFn: TrackByFunction<AbstractControl> = (index, item) => Object.keys(item)[0] || index;

  userTypes = userTypeOptions;

  isUserNameUpdateEnabled = true;

  userTypeSelected: number = 0;

  onVisiblePermissionChange = event => {
    this.visiblePermissions = event;
  };

  get roleGroups(): FormGroup[] {
    return ((this.form.get('roleNames') as FormArray)?.controls as FormGroup[]) || [];
  }

  constructor(
    public readonly list: ListService<GetIdentityUsersInput>,
    protected confirmationService: ConfirmationService,
    protected service: IdentityUserService,
    protected usuarioService: UsuarioService,
    protected usuarioLdapService: UsuarioLdapService,
    private configState: ConfigStateService,
    protected fb: FormBuilder,
    protected injector: Injector,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
    this.init();
    this.hookToQuery();
  }

  protected init() {
    this.isUserNameUpdateEnabled =
      (
        (this.configState.getSetting('Abp.Identity.User.IsUserNameUpdateEnabled') as string) || ''
      ).toLowerCase() !== 'false';
  }

  buildForm() {

     

    const data = new FormPropData(this.injector, this.selected);
    
    this.service.getAssignableRoles().subscribe(({ items }) => {
      this.roles = items;

      this.form = generateFormFromProps(data);

      this.form.removeControl('password');

      this.form.addControl(
        'roleNames',
        this.fb.array(
          this.roles.map(role =>
            this.fb.group({
              [role.name]: [
                this.selected.id
                  ? !!this.selectedUserRoles?.find(userRole => userRole.id === role.id)
                  : role.isDefault,
              ],
            }),
          ),
        ),
      );

      //New Fields
      this.form.addControl('userType', new FormControl(this.selected.userType || null, Validators.required));
      this.form.addControl('code', new FormControl(this.selected.code || null,
         Validators.maxLength(3)));
      this.form.addControl('isActive', new FormControl(!!this.selected.isActive ));


      this.controlManager(this.selected.userType);
      
    });

  }

  openModal() {
    this.buildForm();
    this.isModalVisible = true;


  }

  add() {
    this.selected = {} as IdentityUserDto;
    //Inicializar valores
    this.selected.isActive = true;

    this.selectedUserRoles = [] as IdentityRoleDto[];
    this.openModal();
  }

  edit(id: string) {
    this.service
      .get(id)
      .pipe(
        tap(user => {
          this.selected = user;
         
        }),
        switchMap(() => this.service.getRoles(id)),
      )
      .subscribe(userRole => {
        this.selectedUserRoles = userRole.items || [];
        this.openModal();
      });
  }

  save() {
 
    this.form.markAllAsTouched();

    if (!this.form.valid || this.modalBusy) return;
    this.modalBusy = true;

    const { roleNames = [] } = this.form.value;
    const mappedRoleNames =
      roleNames.filter(role => !!role[Object.keys(role)[0]]).map(role => Object.keys(role)[0]) ||
      [];

    const { id } = this.selected;

    (id
      ? this.service.update(id, {
        ...this.selected,
        ...this.form.value,
        roleNames: mappedRoleNames,
      })
      : this.usuarioService.crear({ ...this.form.value, roleNames: mappedRoleNames })
    )
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.isModalVisible = false;
        this.list.get();
      });
  }

  delete(id: string, userName: string) {
    this.confirmationService
      .warn('AbpIdentity::UserDeletionConfirmationMessage', 'AbpIdentity::AreYouSure', {
        messageLocalizationParams: [userName],
      })
      .subscribe((status: Confirmation.Status) => {
        if (status === Confirmation.Status.confirm) {
          this.service.delete(id).subscribe(() => this.list.get());
        }
      });
  }

  sort(data) {
    const { prop, dir } = data.sorts[0];
    this.list.sortKey = prop;
    this.list.sortOrder = dir;
  }

  private hookToQuery() {
    this.list.hookToQuery(query => this.service.getList(query)).subscribe(res => (this.data = res));
  }

  openPermissionsModal(providerKey: string) {
    this.providerKey = providerKey;
    setTimeout(() => {
      this.visiblePermissions = true;
    }, 0);
  }


  changeUserType(e) { 
    this.controlManager(e.target.value); 
  }

  
  obtenerUsuarioInfo() {
     
   
     var usuario = this.form.controls['userName'].value;

     if (!usuario){
      this.toaster.error('Base::UserLdap:IngreseUsuario', 'Base::AdvertenciaTitulo');
      return;
     }

     this.obtenerUsuarioOcupado = true; 

       
     this.usuarioLdapService.buscarUsuario(usuario)
     .pipe(finalize(() => (this.obtenerUsuarioOcupado = false)))
     .subscribe(res => {
       if (res) { 
         this.form.controls['name'].setValue(res.nombre);
         this.form.controls['surname'].setValue(res.apellido);
         this.form.controls['email'].setValue(res.email); 
       }else{
        this.form.controls['name'].setValue(null);
        this.form.controls['surname'].setValue(null);
        this.form.controls['email'].setValue(null); 
        this.toaster.warn('Base::UserLdap:NoExiste', 'Base::AdvertenciaTitulo');
       }
     });
  }

  controlManager(value){
   
    if (!this.form)
      return;   

    if (!value)
      this.userTypeSelected = 0;

    
    if (value.toString() === UserType.Internal.toString()) {
      this.userTypeSelected = 1;

    } else if (value.toString() === UserType.External.toString()) {
      this.userTypeSelected = 2;
    } else {
      this.userTypeSelected = 0;
    }
     
  }
}
