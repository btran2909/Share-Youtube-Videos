import { Component, OnInit } from '@angular/core';
import {UserInfoModel} from '../../models/UserInfoModel';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: UserInfoModel = new UserInfoModel(
  {
    guid: "D21ds12x", 
    customerUid: "cust2dsa12dsa", 
    first_name: "tran", 
    last_name: "bao", 
    email: "tranbao299@gmail.com", 
    zipcode: 10283,
    password: "Idasn2x2#"
});

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  private subscriber: any;
  
  ngOnInit()
  {
    this.subscriber = this.route.params.subscribe(params => {
      this.http.get('/api/v1/customer/' + params.uid).subscribe((data:any) => {
        this.user = new UserInfoModel(data.customer);
      });
    });
  }

}
