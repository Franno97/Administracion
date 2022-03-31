import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-perito',
  template: `
    <lib-tramites-pendientes [tabHeader]="tabHeader" [tabDataSource]="tabDataSource"></lib-tramites-pendientes>
  `,
  styles: [
  ]
})
export class PeritoComponent implements OnInit {
  @Input() tabHeader:Array<any> = [];
  @Input() tabDataSource:Array<any> = [];
  constructor() { }

  ngOnInit(): void {
  }

}
