import { AuthService } from './../../../../../shared/services/authentication/auth.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgotpassword',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
private readonly _FormBuilder = inject(FormBuilder)
  constructor(private _AuthService: AuthService, private _Router:Router) { }
  forgotPasswordForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]]
  })

  forgotPassword() {
    if (this.forgotPasswordForm.valid) {
      console.log(this.forgotPasswordForm);
      this._AuthService.ForgotPassword(this.forgotPasswordForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.statusMsg === "success") {
            this._Router.navigate(['/verifyresetcode'])
          }
            }
          });
          }
        }
      }
        