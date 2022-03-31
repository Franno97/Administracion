import { AuthService, ConfigStateService, CurrentUserDto, NAVIGATE_TO_MANAGE_PROFILE, SessionStateService } from '@abp/ng.core';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-current-user-adapt',
  templateUrl: './current-user-adapt.component.html',
  styleUrls: ['./current-user-adapt.component.scss']
})
export class CurrentUserAdaptComponent  {

  currentUser$: Observable<CurrentUserDto> = this.configState.getOne$('currentUser');
  selectedTenant$ = this.sessionState.getTenant$();

  get smallScreen(): boolean {
    return window.innerWidth < 992;
  }

  constructor(
    @Inject(NAVIGATE_TO_MANAGE_PROFILE) public navigateToManageProfile,
    private authService: AuthService,
    private configState: ConfigStateService,
    private sessionState: SessionStateService,
    private router: Router
  ) {}

  navigateToLogin() {
    this.authService.navigateToLogin();
  }

  navigateToMiFirmaElectronica(){
    this.router.navigate(['/unidad-administrativa/mi-firma-electronica']);
  }

  logout() {
    this.authService.logout().subscribe();
  }

}
