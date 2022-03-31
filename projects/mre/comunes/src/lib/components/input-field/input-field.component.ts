import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit {
  @Input() placeHolder:string = '';
  @Input()  formCtrlName:string = "";
  @Input() typeInput:string = '';
  @Input() formControlData:FormGroup;
  @Input() icon:string ='';
  @Input() contentInfo:boolean = false;
  @Input() disabledx:boolean;
  @Input() inputInfoContet:string = "";
  validField:boolean=false; 
  constructor() { }

  ngOnInit(): void {
  }
  changeColorToInput()
  {
      //this.validField =  this.formControlData.controls[this.formCtrlName].valid;
  }
}
