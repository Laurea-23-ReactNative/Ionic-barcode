import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { RegisterPageForm } from './form/register.page.form';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/AppState';
import { hide, show } from 'src/app/store/loading/loading.actions';
import { RegisterState } from 'src/app/store/register/RegisterState';
import { register } from 'src/app/store/register/register.actions';
import { login } from 'src/app/store/login/login.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {
  registerForm: RegisterPageForm;
  registerStateSubscription: Subscription;

  constructor(
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.createForm();

    this.watchRegisterState();
  }
  
  ngOnDestroy(){
    this.registerStateSubscription.unsubscribe();
  }

  register() {
    this.registerForm.getForm().markAllAsTouched();
    if (this.registerForm.getForm().valid) {
      this.store.dispatch(
        register({ userRegister: this.registerForm.getForm().value })
      );
    }
  }

  private createForm() {
    this.registerForm = new RegisterPageForm(this.formBuilder);
  }

  private watchRegisterState() {
    this.registerStateSubscription = this.store.select('register').subscribe((state) => {
      this.toggleLoading(state as any);

      this.onRegistered(state);
      this.onError(state);
    });
  }

  private onRegistered(state: RegisterState) {
    if (state.isRegistered) {
      this.store.dispatch(
        login({
          email: this.registerForm.getForm().value.email,
          password: this.registerForm.getForm().value.password,
        })
      );
    }
  }

  private onError(state: RegisterState) {
    if (state.error) {
      this.toastController
        .create({
          message: state.error.message,
          duration: 5000,
          header: 'Registration not done',
        })
        .then((toast) => toast.present());
    }
  }

  private toggleLoading(registerState: RegisterState) {
    if (registerState.isRegistering) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Terms of Service',
      message: `Saperet menandri an cum. Vim fuisset inciderint no, soluta appetere euripidis quo te, dicunt aperiri dissentiet ius ex. Quo ex hinc mutat facer, ne integre aliquam delectus usu, ex per eros audire. Vix ne veniam deterruisset. Id veniam laudem iracundia sed, ei vix eripuit vulputate moderatius. Ius illud alterum scriptorem an, no nominati pertinacia expetendis eam.

      At vim utroque laoreet molestiae, facer tractatos eloquentiam ea ius. Libris impetus mentitum ne duo. Et his quod necessitatibus, ei pro dictas officiis intellegat, autem altera suavitate in mei. Nam unum officiis invenire id, ex pri stet illum utinam, et tation vocibus interpretaris nec. Duo ut nostrud concludaturque. In tacimates consectetuer quo, ea tempor nominavi expetendis eum.`,
      buttons: ['Close'],
    });

    await alert.present();
  }
}
