import { Component, OnInit } from '@angular/core';
import { TramitesPendientesService } from 'projects/mre/switch-funcionario-perito-consultor/src/lib/services/tramites-pendientes.service';

@Component({
  selector: 'lib-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {
  linksArr: Array<any> = [];
  linksArrTemp: Array<any> = [];
  isCollapsed = true;

  constructor(private tramitesPendientesService: TramitesPendientesService) {
    this.tramitesPendientesService.getLinks().subscribe(response => {

      this.linksArr = response;
      this.linksArrTemp = this.linksArr;
    });
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.linksArrTemp = this.linksArr.filter(x => {
      let cad = (x.Title).toLowerCase();
      let filter = cad.includes(filterValue.toLowerCase());
      return filter ? x : null;

    });
  }
  toogle(): void {
    this.isCollapsed = !this.isCollapsed;

  }
}
