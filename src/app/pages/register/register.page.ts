import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(private alertController: AlertController) { }

  ngOnInit() {
    console.log();
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