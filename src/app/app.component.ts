/*********************************************************************************
*  WEB422 – Assignment 06
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Abdalla Aden Student ID: 021-720-057 Date: 08/17/22
*
*  Angular App (Deployed) Link: https://stellar-pudding-3ef9f8.netlify.app/
*
*  User API (Heroku) Link: https://spotifyangularapi-production.up.railway.app/api/user
*
********************************************************************************/ 

import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web422-a6-AAden';
  searchString: string = "";
  token:any;

  constructor(private router: Router,private auth: AuthService){}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.auth.readToken();
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }


  handleSearch(){
    this.router.navigate(['/search'], { queryParams: { q: this.searchString } });
    this.searchString = "";
  }

}
