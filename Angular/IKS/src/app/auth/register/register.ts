import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../shared/classes/user';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  users: User[] = [];
  new: User = new User();
  repp: string = '';
  constructor(private http: HttpClient, private router: Router, private regService: AuthService) {}

  kontrolaUsername(username: string): boolean {
    if (this.users != null) {
      for (let e of this.users) {
        if (e.Username == username) {
          return true;
        }
      }
      return false;
    }
    return false;
  }

  validation() {
    let f = true;
    let usrErr = document.getElementById('userErr');
    let passErr = document.getElementById('passErr');
    let rpassErr = document.getElementById('rpassErr');
    let nameErr = document.getElementById('nameErr');
    let dateErr = document.getElementById('dateErr');
    let surErr = document.getElementById('surErr');
    if (this.new.Username == '' && usrErr != null) {
      f = false;
      usrErr.innerHTML = 'Potrebno je unjeti username korisnika!';
    } else {
      if (this.new.Username.length < 4 && usrErr != null) {
        f = false;
        usrErr.innerHTML = 'Username mora sadrzavati barem 4 znaka!';
      } else {
        if (this.kontrolaUsername(this.new.Username) && usrErr != null) {
          f = false;
          usrErr.innerHTML = 'Korisnik s tim usernameom vec postoji!';
        } else {
          if (usrErr) {
            usrErr.innerHTML = '';
          }
        }
      }
    }

    if (this.new.Password == '' && passErr != null) {
      f = false;
      passErr.innerHTML = 'Potrebno je unjeti lozinku korisnika!';
    } else {
      if (passErr) {
        passErr.innerHTML = '';
      }
    }
    if (this.repp != this.new.Password && rpassErr != null) {
      f = false;
      rpassErr.innerHTML = 'Potrebno je točno ponoviti lozinku!';
    } else {
      if (rpassErr) {
        rpassErr.innerHTML = '';
      }
    }
    if (this.new.Name == '' && nameErr != null) {
      f = false;
      nameErr.innerHTML = 'Potrebno je unjeti ime korisnika!';
    } else {
      if (nameErr) {
        nameErr.innerHTML = '';
      }
    }
    if (this.new.DateOfBirth == null && dateErr != null) {
      f = false;
      dateErr.innerHTML = 'Potrebno je odabrati datum rođenja!';
    } else {
      if (dateErr) {
        dateErr.innerHTML = '';
      }
    }
    if (this.new.Surname == '' && surErr != null) {
      f = false;
      surErr.innerHTML = 'Potrebno je unjeti prezime korisnika!';
    } else {
      if (surErr) {
        surErr.innerHTML = '';
      }
    }
    return f;
  }
  addUser() {
    if (this.validation()) {
      console.log(this.new);
      this.regService.registerUser(this.new).subscribe((res) => {
        //this.router.navigate(['/login']);
        console.log(res.json());
      });
    }
  }
}
