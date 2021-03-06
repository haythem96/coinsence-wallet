import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { WalletProvider } from '../../providers/wallet/wallet';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private modalController: ModalController,
    private walletProvider: WalletProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /**
   * open qr-scanner modal
   */
  scanOnclick() {
    let scanQrModal = this.modalController.create('ScanQrPage');
    scanQrModal.onDidDismiss(ethAddress => {
      if(ethAddress != undefined) {
        //get ethereum address
        const address = ethAddress.split(":").pop();

        // check if address is valid
        if(this.walletProvider.checkAddress(address)) {
          const wallet = { signingKey: { address: address } };

          //save wallet
          localStorage.setItem("wallet", JSON.stringify(wallet));
          localStorage.setItem("isWallet", "true");

          this.navCtrl.push('TabsPage');
        }
        else {
          this.permissionDeniedToast('Invalid address!');
        }
      }
      else {
        this.permissionDeniedToast('No address detected!');
      }
    })

    scanQrModal.present();
  }

  /**
   * show denied permission toast
   * @param message toast message to show
   */
  permissionDeniedToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'buttom',
      cssClass: 'danger',
    });

    toast.present();
  }

  /**
   * open create wallet modal
   */
  createWalletModal() {
    let wallet = this.walletProvider.createWallet();
    localStorage.setItem("isWallet", "true");

    let createWalletModal = this.modalController.create('CreateWalletPage', { wallet: wallet }, { showBackdrop: false, enableBackdropDismiss: false});
    createWalletModal.present();
  }

}
