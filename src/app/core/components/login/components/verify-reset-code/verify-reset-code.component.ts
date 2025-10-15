import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../../shared/services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-reset-code',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './verify-reset-code.component.html',
  styleUrl: './verify-reset-code.component.css'
})
export class VerifyResetCodeComponent {
  private readonly _FormBuilder = inject(FormBuilder)
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  resetCodeForm: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern('^[0-9]{6}$')]]
  })

  resetCode() {
    if (this.resetCodeForm.valid) {
      console.log(this.resetCodeForm);
      this._AuthService.VerifyResetCode(this.resetCodeForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === "Success") {
            this._Router.navigate(['/resetpassword'])
          }
        }
      });
    }
  }
}
