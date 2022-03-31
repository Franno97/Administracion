import { Component, OnInit } from '@angular/core';

import {Observable, of,OperatorFunction} from 'rxjs';
import {debounceTime, map,distinctUntilChanged,switchMap,tap,catchError} from 'rxjs/operators';

//Proxy identity Custom
import {
  GetIdentityUsersInput,
  IdentityRoleDto,
  IdentityUserDto,
  IdentityUserService,
  userTypeOptions,
  UserType
} from '@proxy/volo/abp/identity/index'

@Component({
  selector: 'lib-search-user-test',
  templateUrl: './search-user-test.component.html',
  styleUrls: ['./search-user-test.component.css']
})
export class SearchUserTestComponent implements OnInit {


  public userSelect: IdentityUserDto;

  searching = false;
  searchFailed = false;

  constructor(private identityUserService: IdentityUserService) { }

  ngOnInit(): void {
  }


  searchUser: OperatorFunction<string, readonly IdentityUserDto[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(filter => {
        
        if (filter === '') {
          return of([]);
        }

        const input = {} as GetIdentityUsersInput;
        input.filter = filter;
        input.userType = UserType.Internal;

        return this.identityUserService.getList(input).pipe(
          map(a => a.items),
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }));
      }
      ),
      tap(() => this.searching = false)
    )

    formatterUser = (x: IdentityUserDto) => x.userName;
}
