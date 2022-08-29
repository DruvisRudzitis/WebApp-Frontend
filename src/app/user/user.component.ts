import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../users/users.component';

export interface IItem {
  id: number;
  code: string;
  title: string;
  price: number;
}
export interface IUserResponse {
  user: IUser;
  items: IItem[]
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  user$: Observable<IUserResponse>;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    const userId = route.snapshot.paramMap.get('id');
    this.user$ = this.http.get<IUserResponse>(`api/v1/user/${userId}`);
  }

  purchase(user: IUser, item: IItem) {
    const purchaseData = {
      user: user.id,
      item: item.id,
    };
    this.http.post<IUserResponse>(`api/v1/purchase`, purchaseData).subscribe(s => {
      alert(`Item '${item.title}' purchased!`)
    });
  }

}
