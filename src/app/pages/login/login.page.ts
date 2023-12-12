import { LoginState } from './../../store/login/LoginState';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginPageForm } from './login.page.form';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/AppState';
import { show, hide } from 'src/app/store/loading/loading.actions';
import {
  recoverPassword,
  recoverPasswordFail,
  recoverPasswordSuccess,
  login,
  loginSuccess,
  loginFail,
} from 'src/app/store/login/login.actions';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  form: FormGroup;
  loginStateSubscription: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private toastController: ToastController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.loginStateSubscription = this.store
      .select('login')
      .subscribe((loginState) => {
        this.onIsRecoveredPassword(loginState);
        this.onIsRecoveringPassword(loginState);

        this.onIsLoggingIn(loginState);
        this.onIsLoggedIn(loginState);

        this.onError(loginState);
        this.toggleLoading(loginState);
      });
  }

  // sivulta poistuttaessa ei tarvitse enää seurata tilannetta
  ngOnDestroy(): void {
    if (this.loginStateSubscription) {
      this.loginStateSubscription.unsubscribe();
    }
  }

  // loaderin togglaaja
  private toggleLoading(loginState: LoginState) {
    if (loginState.isLoggingIn || loginState.isRecoveringPassword) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  // on kirjautunut
  private onIsLoggedIn(loginState: LoginState) {
    if (loginState.isLoggedIn) {
      this.router.navigate(['index']);
    }
  }

  // kirjautuu tällä hetkellä
  private onIsLoggingIn(loginState: LoginState) {
    if (loginState.isLoggingIn) {
      const email = this.form.get('email').value;
      const password = this.form.get('password').value;
      this.authService.login(email, password).subscribe((user) => {
        this.store.dispatch(loginSuccess({ user }));
      }, error => {
        this.store.dispatch(loginFail({error}));
      });
    }
  }

  // palauttaa salasanaa tällä hetkellä
  private onIsRecoveringPassword(loginState: LoginState) {
    if (loginState.isRecoveringPassword) {
      this.authService
        .recoverEmailPassword(this.form.get('email').value)
        .subscribe(
          () => {
            this.store.dispatch(recoverPasswordSuccess());
          },
          (error) => {
            this.store.dispatch(recoverPasswordFail({ error }));
          }
        );
    }
  }

  // salasana on palautettu
  private async onIsRecoveredPassword(loginState: LoginState) {
    if (loginState.isRecoveredPassword) {
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: 'Recovery email sent',
        duration: 3000,
        color: 'success'
      });
      toaster.present();
    }
  }

  // virheilmoitus
  private async onError(loginState: LoginState) {
    if (loginState.error) {
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: loginState.error.message,
        duration: 3000,
        color: 'danger'
      });
      toaster.present();
    }
  }

  forgotEmailPassword() {
    this.store.dispatch(recoverPassword({email: this.form.get('email').value}));
  }

  login() {
    this.store.dispatch(login({email: this.form.get('email').value, password: this.form.get('password').value}));
  }
}
