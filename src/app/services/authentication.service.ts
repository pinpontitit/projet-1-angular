import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from './local.service';

import { UserModel } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  users: UserModel[];
  user: UserModel | undefined;
  constructor(private router: Router, private localStore: LocalService) {
    let tmpUser = this.localStore.getData('user');
    if (tmpUser) {
      this.user = JSON.parse(tmpUser);
    } else {
    }

    /* if (JSON.parse(localStorage.getItem('user')!) !== null) {
      this.user = JSON.parse(localStorage.getItem('user')!);
    } */

    this.users = [
      { email: 'elbab@gmail.com', password: '1234', roles: ['ADMIN', 'USER'] },
      { email: 'hugo@gmail.com', password: '1234', roles: ['USER'] },
    ];
  }

  login(email: string, password: string) {
    let user = this.users.find(
      (x) => x.email === email && x.password === password
    );
    if (user) {
      this.user = user;
      this.localStore.saveData('user', JSON.stringify(this.user));
      console.log('login1');
      return true;
    }
    console.log('login2');
    return false;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('login');
  }

  isAdmin() {
    console.log(this.user, 'user');
    return this.user?.roles.includes('ADMIN');
  }
  getUser(): UserModel | undefined {
    return this.user;
  }
}
