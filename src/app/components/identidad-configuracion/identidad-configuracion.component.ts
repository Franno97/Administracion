import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';


import { collapse, ToasterService } from '@abp/ng.theme.shared';

import {
   IdentidadConfiguracionService,
   ActualizarIdentidadConfiguracionDtoDto,
   IdentidadConfiguracionDto
} from '@proxy/identidad/index'

@Component({
  selector: 'app-identidad-configuracion',
  templateUrl: './identidad-configuracion.component.html',
  styleUrls: ['./identidad-configuracion.component.scss'],
  animations: [collapse]
})
export class IdentidadConfiguracionComponent implements OnInit {

  formulario: FormGroup;

  guardando = false;

  constructor(
    private identidadConfiguracionService: IdentidadConfiguracionService,
    private fb: FormBuilder,
    private toasterService: ToasterService,
  ) {}

   

  ngOnInit(): void {
    this.getDatos();
  }

  private getDatos() {
    this.identidadConfiguracionService.obtener().subscribe(res => {
      this.construirFormulario(res);
    });
  }


  private construirFormulario(configuracion: IdentidadConfiguracionDto) {
    this.formulario = this.fb.group({
      claveLongitud: [configuracion.claveLongitud, [Validators.required]],
      claveRequiereDigito: [configuracion.claveRequiereDigito],
      claveRequiereMayusculas: [configuracion.claveRequiereMayusculas],
      claveRequiereMinusculas: [configuracion.claveRequiereMinusculas],
      claveRequiereNoAlfanumericos: [configuracion.claveRequiereNoAlfanumericos], 
      bloqueoMaximoAccesoFallidos: [configuracion.bloqueoMaximoAccesoFallidos,
        [ Validators.min(0),
          Validators.max(30)]], 
      bloqueoNuevosUsuarios: [configuracion.bloqueoNuevosUsuarios], 
      bloqueoTiempo: [configuracion.bloqueoTiempo],
      accesoNotificarFallidos: [configuracion.accesoNotificarFallidos],
      controlarClavesAnterior: [configuracion.controlarClavesAnterior],
      controlarClavesAnteriorCantidad: [configuracion.controlarClavesAnteriorCantidad,
        [ Validators.min(1),
          Validators.max(15)]]
    });
  }

  guardar() {
    if (this.guardando || this.formulario.invalid) return;

    this.guardando = true;
    this.identidadConfiguracionService
      .actualizar(this.formulario.value)
      .pipe(finalize(() => (this.guardando = false)))
      .subscribe(() => {
        this.toasterService.success('Base::IdentidadConfiguracion:GuardarOk');
        this.getDatos();
      });
  }

}
