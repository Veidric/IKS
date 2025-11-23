import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from "@angular/router";
import {RouterModule} from '@angular/router';
import {User} from "../shared/Klase/user";
import { AuthService } from '../services/auth.service';
import {HttpClient} from "@angular/common/http";
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  users : User[] = [];
  tmpusr="";
  tmppass="";
  jao: any;
  constructor(private router: Router, private authService:AuthService) {
  };
  ngOnInit() {
    localStorage.clear();
  }
  async checkInfo() {
    let f = true;
    let netocno = document.getElementById("netocno");

    let obj = {username:this.tmpusr, password:this.tmppass};
    let response = await this.authService.loginUser(obj).subscribe(jao => {
      localStorage.setItem('user', JSON.stringify(jao['user']))
      localStorage.setItem('token', JSON.stringify(jao['token']));
      this.router.navigate(['/profile'])
    })

    /*for (let i=0; i<this.users.length; i++){
      if (this.tmpusr == this.users[i].username && this.tmppass==this.users[i].password) {
          f=false;
          await localStorage.setItem('user', JSON.stringify(this.users[i]));

      }
    }*/
    if (f && netocno) {
      netocno.innerHTML="Korisnicko ime ili lozinka su netocni";
    }
    else {if(netocno) {netocno.innerHTML=""}}
  }
}
