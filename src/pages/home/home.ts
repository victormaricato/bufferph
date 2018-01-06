import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { stringify } from '@angular/core/src/util';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  phi: number;
  phf: number;
  pka: number;
  ctamp: number;
  vtamp: number;
  cb: number;
  result: any;
  header: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  checkpKa() {
    if (+this.phi > 14 || +this.phi < 1 || +this.phf > 14 || +this.phf > 14) {
      let alert = this.alertCtrl.create({
        title: 'WOOOOW',
        subTitle: 'Cheque seus pH`s, eles estão um pouco fora da realidade!!',
        buttons: ['OK']
      });
      alert.present();
    }
      else {
        this.calculate();
      }

    if(+this.pka - +this.phf > 1) {
      this.result = "Não disponível";
      let confirm = this.alertCtrl.create({
        title: 'Zona de Tamponamento',
        message: 'Normalmente, os tampões suportam um pH +- 1 que seu pKa. Têm certeza que os valores estão corretos?',
        buttons: [
          {
            text: 'Não, deixe-me corrigir',
          },
          {
            text: 'Sim, estão corretos',
            handler: () => {
              this.calculate();
            }
          }
        ]
      });
      confirm.present();
    }
        else{
          this.calculate();
        }
  }

  calculate() {
    var ohi = 10 ** -(14 - this.phi);
    var hi = 10 ** (-(this.phi));
    var ohf = 10 ** (-(14 - this.phf));
    var hf = 10 ** (-(this.phf));
    var ka = 10 ** (-(this.pka));
    var vt = this.vtamp * 10 ** (-3);
    var alpha = (ka / (hi + ka));
    var concbase = +this.cb; //garante que o input da concentração está sendo passado como número e não String

    if (+this.phi > +this.phf) {
      var nominador = (hf + (this.ctamp * vt * alpha) * vt);
      var denominador = (hi + concbase);
      this.header = "O volume de ácido que deve ser adicionado é: "
    }
    if (+this.phi < +this.phf) {
      var nominador = (ohf - hf + (this.ctamp * vt * alpha) * vt);
      var denominador = (ohi - hi + concbase);
      this.header = "O volume de base que deve ser adicionado é: "
    }
    var resultL = (nominador / denominador);
    this.result = (resultL * 10 ** 3) + ' mL';
  }
}

