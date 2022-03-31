import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-tabs-view',
  templateUrl: './tabs-view.component.html',
  styleUrls: ['./tabs-view.component.scss'],
})
export class TabsViewComponent {
  @Input() tabsHeader: Array<string>;
  @Input() cantTabs: number = 7;
  @Output() tabsVisited = new EventEmitter();
  active: number = 1;
  classLinkVisited: Array<string> = [];
  linkVisited = [true, false, false, false, false, false, false];
  numberTabClickedBefore: number = 0;

  constructor() {
    this.classLinkVisited[0] = 'text-success';
  }

  private comprobarLinkVistados(): boolean {
    let valueVisited = true;
    for (let i = 1; i < this.cantTabs; i++) {
      valueVisited = valueVisited && this.linkVisited[i];
    }

    return valueVisited;
  }

  visited(i: number) {
    this.linkVisited[i] = true;
    this.classLinkVisited[i] = 'text-success';
    this.tabsVisited.emit({
      linkVisited: this.comprobarLinkVistados(),
      numberTabClicked: i,
      tabsName: this.tabsHeader[i],
      numberTabClickedBefore: this.numberTabClickedBefore,
      tabsNameClickedBefore: this.tabsHeader[this.numberTabClickedBefore]
    });
    this.numberTabClickedBefore = i;
  }

}
