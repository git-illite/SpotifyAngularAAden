import { Component, OnInit } from '@angular/core';
import RegisterUser from '../RegisterUser';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUser: RegisterUser = { userName: "", password: "", password2: "" };
  warning: String = "";
  success: boolean = false;
  loading: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registerUser.userName.length == 0) {
      this.success = false;
      this.loading = false;
      this.warning = 'Username should not be blank';
    } 
    else if (this.registerUser.password == '' ||this.registerUser.password2 == '') {
      this.success = false;
      this.loading = false;
      this.warning = 'Password must not be empty';
    } 
    else if (this.registerUser.password !== this.registerUser.password2) {
      this.success = false;
      this.loading = false;
      this.warning = 'Passwords do not match';
    }
    else {
      this.loading = true;
      this.auth.register(this.registerUser).subscribe(
        (msg) => {
          this.success = true;
          this.warning = '';
          this.loading = false;
        },
        (err) => {
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        }
      );
    }
  }

}
