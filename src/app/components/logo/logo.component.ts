import { ApplicationInfo, EnvironmentService } from '@abp/ng.core';
import { Component } from '@angular/core';

 

@Component({
  selector: 'mre-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  

  constructor(private environment: EnvironmentService) {}

  get appInfo(): ApplicationInfo {
    return this.environment.getEnvironment().application;
  }
  
}