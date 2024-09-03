import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommonService } from '../services/common.service';

export const authGuard: CanActivateFn = () => {
  console.log("in authguard");

  const commonService = inject(CommonService)
  const router = inject(Router)
  if(commonService.isAuthenticated()){
    console.log("authguard true");
    return true;
  }else{
    console.log("authguard false");
     router.navigate(['/'])
     return false;
  }  
};