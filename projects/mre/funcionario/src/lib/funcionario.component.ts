import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-funcionario',
  template: `
    <lib-tramites-pendientes [tabHeader]="tabHeader" [tabDataSource]="tabDataSource"></lib-tramites-pendientes>
  `,
  styles: [
  ]
})
export class FuncionarioComponent implements OnInit {
  @Input() tabHeader:Array<any>;
  @Input() tabDataSource:Array<any>;
  constructor() { }

  ngOnInit(): void {
  }

}
