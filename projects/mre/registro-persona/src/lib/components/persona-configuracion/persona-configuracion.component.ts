import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { ActualizarPersonaConfiguracionDto, PersonaConfiguracionDto } from '../../proxy/mre/sb/registro-persona/persona';
import { PersonaConfiguracionService } from '../../proxy/mre/sb/registro-persona/persona';

@Component({
  selector: 'lib-persona-configuracion',
  templateUrl: './persona-configuracion.component.html',
  styleUrls: ['./persona-configuracion.component.css']
})
export class PersonaConfiguracionComponent implements OnInit {

  formulario: FormGroup;
  mostrarFormulario = false;

  guardando = false;

  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;

  constructor(
    private personaConfiguracionService: PersonaConfiguracionService,
    private fb: FormBuilder,
    private toasterService: ToasterService,
    private confirmation: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.obtenerDatos();
    this.getMinDate();
    this.getMaxDate();
  }

  obtenerDatos() {
    this.personaConfiguracionService.obtener().subscribe(respuesta => {
      this.construirFormulario(respuesta);
    })
  }

  getMaxDate() {
    let today: Date = new Date();
    this.maxDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
  }

  getMinDate() {
    let today: Date = new Date();
    this.minDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() +1 };
  }

  construirFormulario(configuracion: PersonaConfiguracionDto) {
    const fechaInicial = new Date(configuracion.fechaInicialControl);
    const fechaFinal = new Date(configuracion.fechaFinalControl);

    this.formulario = this.fb.group({
      validarPuntoDeAcceso: [configuracion.validarPuntoDeAcceso],
      validarNacionalidad: [configuracion.validarNacionalidad],
      nacionalidadesPermitidas: [configuracion.nacionalidadesPermitidas, [Validators.required]],
      validarMayoriaEdad: [configuracion.validarMayoriaEdad],
      edadMinima: [configuracion.edadMinima, [Validators.required]],
      habilitarCaptcha: [configuracion.habilitarCaptcha],
      fechaInicialControl: [{ year: fechaInicial.getFullYear(), month: fechaInicial.getMonth() + 1, day: fechaInicial.getDate() }, [Validators.required]],
      fechaFinalControl: [{ year: fechaFinal.getFullYear(), month: fechaFinal.getMonth() + 1, day: fechaFinal.getDate() }, [Validators.required]],
      duracionCodigoVerificacion: [configuracion.duracionCodigoVerificacion, [Validators.required]],
      intentosPermitidos: [configuracion.intentosPermitidos, [Validators.required]],
      duracionBloqueo: [configuracion.duracionBloqueo, [Validators.required]],
      vigenciaInformacion: [configuracion.vigenciaInformacion, [Validators.required]]
    });
    this.mostrarFormulario = true;
  }

  guardar() {
    if (this.guardando || this.formulario.invalid) {
      return;
    }



    this.guardando = true;

    let temporalDate: NgbDateStruct = this.formulario.controls.fechaInicialControl.value;
    let initialDate = new Date(temporalDate.year, temporalDate.month - 1, temporalDate.day);
    const fechaInicialIso = initialDate.toISOString();

    temporalDate = this.formulario.controls.fechaFinalControl.value;
    let finishDate = new Date(temporalDate.year, temporalDate.month - 1, temporalDate.day);
    const fechaFinalIso = finishDate.toISOString();
    
    if(initialDate >= finishDate) {
      this.showDateValidationMessage();
      this.guardando = false;
      return;
    }

    const datos: ActualizarPersonaConfiguracionDto = {
      validarPuntoDeAcceso: this.formulario.controls.validarPuntoDeAcceso.value,
      validarNacionalidad: this.formulario.controls.validarNacionalidad.value,
      nacionalidadesPermitidas: this.formulario.controls.nacionalidadesPermitidas.value,
      validarMayoriaEdad: this.formulario.controls.validarMayoriaEdad.value,
      edadMinima: this.formulario.controls.edadMinima.value,
      habilitarCaptcha: this.formulario.controls.habilitarCaptcha.value,
      fechaInicialControl: fechaInicialIso,
      fechaFinalControl: fechaFinalIso,
      duracionCodigoVerificacion: this.formulario.controls.duracionCodigoVerificacion.value,
      intentosPermitidos: this.formulario.controls.intentosPermitidos.value,
      duracionBloqueo: this.formulario.controls.duracionBloqueo.value,
      vigenciaInformacion: this.formulario.controls.vigenciaInformacion.value
    };

    this.personaConfiguracionService
      .actualizar(datos)
      .pipe(finalize(() => (this.guardando = false)))
      .subscribe(() => {
        this.toasterService.success('Base::IdentidadConfiguracion:GuardarOk');
        this.obtenerDatos();
      });

  }

  showDateValidationMessage() {
    const options: Partial<Confirmation.Options> = {
      hideCancelBtn: true,
      hideYesBtn: false,
      dismissible: false,
      yesText: 'PersonRegistration::RegistroPersonaConfiguracion:FechasValidacionAceptar',
    };

    const confirmationStatus$ = this.confirmation.error(
        'PersonRegistration::RegistroPersonaConfiguracion:FechasValidacionMensaje',
        'PersonRegistration::RegistroPersonaConfiguracion:FechasValidacionTitulo',
        options);
  }

}
