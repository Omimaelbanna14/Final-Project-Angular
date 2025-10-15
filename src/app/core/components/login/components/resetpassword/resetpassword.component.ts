import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from '../../../../../shared/services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
    private readonly _FormBuilder = inject(FormBuilder)
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  resetPasswordForm: FormGroup = this._FormBuilder.group({
    email : [null ,  [Validators.required, Validators.email] ],
    newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,20}$/)]] 
  })

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      console.log(this.resetPasswordForm);
      this._AuthService.ResetPassword(this.resetPasswordForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.token) {
            this._Router.navigate(['/login'])
          }
        }
      });
    }
  }
}
