import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../../security/login/login.component';
import {TokenStorageService} from '../../service/token-storage.service';
import {Router} from '@angular/router';
import {DataService} from '../../service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  isLoginFail = true;
  username: string;
  idEmployee: number;
  currentUser: any;
  nameEmployee: string;
  message = 0;

  constructor(private matDialog: MatDialog,
              private data: DataService,
              private tokenStorageService: TokenStorageService,
              private router: Router) {
    this.checkLoggedIn();
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = (Number(message) - 1)
    );
  }

  checkLoggedIn() {
    if (this.tokenStorageService.getUser()) {
      this.username = this.tokenStorageService.getUser().username;
      this.idEmployee = this.tokenStorageService.getUser().employee.id;
      this.currentUser = this.tokenStorageService.getUser();
      this.nameEmployee = this.tokenStorageService.getUser().employee.name;
      this.isLoggedIn = true;
      this.isLoginFail = false;
    }
  }

  openLoginDialog() {
    const dialogLogin = this.matDialog.open(LoginComponent, {height: '480px', width: '600px'});
    dialogLogin.afterClosed().subscribe(value => {
      if (this.tokenStorageService.getToken()) {
        this.username = this.tokenStorageService.getUser().username;
        this.idEmployee = this.tokenStorageService.getUser().employee.id;
        this.currentUser = this.tokenStorageService.getUser();
        this.nameEmployee = this.tokenStorageService.getUser().employee.name;
        this.isLoggedIn = true;
        this.isLoginFail = false;
      }
    });
  }

  logOut() {
    this.tokenStorageService.logout();
    this.isLoginFail = true;
    this.isLoggedIn = false;
    this.router.navigateByUrl('/home');
  }
}
