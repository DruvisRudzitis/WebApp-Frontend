import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface IUser {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  users$: Observable<IUser[]>;

  constructor(private http: HttpClient, private router: Router) {
    this.users$ = this.http.get<IUser[]>('api/v1/users');
  }

  userClick(user: IUser) {
    this.router.navigate(['user', user.id])
  }
}
