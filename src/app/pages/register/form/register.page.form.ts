import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

export class RegisterPageForm {
  private formBuilder: FormBuilder;
  private form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    let form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', []],
      cbox: [false, RegisterPageForm.mustBeTruthy],
    });

    form.get('repeatPassword').setValidators(matchPasswordAndRepeatPassword(form))

    return form;
  }

  static mustBeTruthy(c: AbstractControl): { [key: string]: boolean } {
    let rv: { [key: string]: boolean } = {};
    if (!c.value) {
      rv['notChecked'] = true;
    }
    return rv;
  }

  getForm(): FormGroup {
    return this.form;
  }
}


function matchPasswordAndRepeatPassword(form: FormGroup) : ValidatorFn {
    const password = form.get('password');
    const repeatPassword = form.get('repeatPassword');

    const validator = () => {
        return password.value == repeatPassword.value ? null : {isntMatching: true}
    };
    return validator;

}