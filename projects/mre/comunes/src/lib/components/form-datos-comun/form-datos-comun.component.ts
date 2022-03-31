import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'lib-form-datos-comun',
  templateUrl: './form-datos-comun.component.html',
  styleUrls: ['./form-datos-comun.component.scss']
})
export class FormDatosComunComponent implements OnInit {
  @Output() formGroupEmit =  new EventEmitter<any>();
  @Input() formData:FormBuilder;
  @Input() showConaDis:boolean = false;
  @Input() titleTab:string = '';
  active:number = 1;
  arrField1 = [
    {placeHolder:"Primer Apellido",typeInput:"text",formCtrolName:"numberMDG",icon:"fas fa-user-circle",contentInfo:false},
    {placeHolder:"Nombres",typeInput:"text",formCtrolName:"numberMDG",icon:"fas fa-user-circle",contentInfo:false},
    {placeHolder:"Pais de Nacimiento",typeInput:"text",formCtrolName:"numberMDG",icon:"fas fa-user-circle",contentInfo:false},
    {placeHolder:"Email",typeInput:"text",formCtrolName:"numberMDG",icon:"fas fa-user-circle",contentInfo:false},
];
  arrField2 = [
    {placeHolder:"Nacionalidad",typeInput:"text",formCtrolName:"numberMDG",icon:"fas fa-user-circle",contentInfo:false},
    {placeHolder:"Nro. de documento",typeInput:"text",formCtrolName:"numberMDG",icon:"fas fa-user-circle",contentInfo:false},
];
  constructor() { 
  }

  ngOnInit(): void {
    this.formGroupEmit.emit(this.formData);
  }
}
