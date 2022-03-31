

import { ApplicationInfo, ConfigStateService, eLayoutType, EnvironmentService, SubscriptionService } from '@abp/ng.core';
import { collapseWithMargin, slideFromBottom } from '@abp/ng.theme.shared';
import { AfterViewInit, Component,ChangeDetectorRef, OnInit } from '@angular/core';

import { eThemeBasicComponents } from '@abp/ng.theme.basic';

 
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'mre-cuerpo',
  templateUrl: './cuerpo.component.html',
  animations: [slideFromBottom, collapseWithMargin],
  providers: [SubscriptionService],
})
export class CuerpoComponent implements AfterViewInit,OnInit  {
  // required for dynamic component
  static type = eLayoutType.application;


  isCollapsed = true;

  smallScreen: boolean; // do not set true or false

  logoComponentKey = eThemeBasicComponents.Logo;

  routesComponentKey = eThemeBasicComponents.Routes;

  navItemsComponentKey = eThemeBasicComponents.NavItems;

  direccion: string;


  constructor(private subscription: SubscriptionService, private cdRef: ChangeDetectorRef,
    private environment: EnvironmentService,
    private configState: ConfigStateService,) {}

  ngOnInit() {
      this.iniciar(); 
  }

  ngAfterViewInit() {
    this.subscribeWindowSize();
  }

  protected iniciar() {
    this.direccion =
       this.configState.getSetting('Base.Institucion.Direccion') ; 
  }

  get appInfo(): ApplicationInfo {
    return this.environment.getEnvironment().application;
  }
  
  private checkWindowWidth() {
    const isSmallScreen = window.innerWidth < 992;
    if (isSmallScreen && this.smallScreen === false) {
      this.isCollapsed = false;
      setTimeout(() => {
        this.isCollapsed = true;
      }, 100);
    }
    this.smallScreen = isSmallScreen;
    this.cdRef.detectChanges();
  }

  subscribeWindowSize() {
    this.checkWindowWidth();

    const resize$ = fromEvent(window, 'resize').pipe(debounceTime(150));
    this.subscription.addOne(resize$, () => this.checkWindowWidth());
  }
  
}