import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AccountService} from "../../account/account.service";
import {map} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  return accountService.currenUserSource$.pipe(
    map(auth => {
      if (auth) return true;
      else {
        router.navigate(['/account/login'], {queryParams: {returnUrl: state.url}});
        return false;
      }
    })
  );
};
