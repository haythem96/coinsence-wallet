import { Injectable } from '@angular/core';
import Box from '3box';

@Injectable()
export class threeboxProvider {

  constructor() {
    console.log('Hello 3boxProvider Provider');
  }


  /**
   * authenticate address
   * If address does not have 3box profile, it will get created
   * BTW mostly this function will not work on a mobile app
   * any stateful function will(maybe!) not work
   * @param address wallet address
   * @param provider ethereum provider
   * @return 3Box instance for the given address
   */
  public async authenticate(address: string, provider: any) {
    const boxInstance = await Box.openBox(address, provider);
    return boxInstance;
  }

  public async getProfile(address: string) {
    const profile = await Box.getProfile(address);
    return profile;
  }

  public async getSocialAccounts(profile: any) {
    const verifiedAccounts = await Box.getVerifiedAccounts(profile);
    return verifiedAccounts;
  }
}
