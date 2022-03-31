import { ABP, SettingTabsService } from '@abp/ng.core';
import { Component, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gestion-configuracion',
  templateUrl: './gestion-configuracion.component.html',
  styleUrls: ['./gestion-configuracion.component.scss']
})
export class GestionConfiguracionComponent implements  OnDestroy, OnInit {

  private subscription = new Subscription();
  settings: ABP.Tab[] = [];

  selected!: ABP.Tab;

  trackByFn: TrackByFunction<ABP.Tab> = (_, item) => item.name;

  constructor(private settingTabsService: SettingTabsService) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription.add(
      this.settingTabsService.visible$.subscribe(settings => {
        this.settings = settings;

        if (!this.selected) this.selected = this.settings[0];
      }),
    );
  }
}
