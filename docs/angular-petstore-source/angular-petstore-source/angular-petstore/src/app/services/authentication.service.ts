import { Injectable } from '@angular/core';
import { CommonService } from './common.service'
import { Account } from '../classes/account'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private commonService: CommonService) { }
    /**
   * [loginUser We'll take an email and password and log the user into the firebase app]
   * @param  {string} email    [User's email address]
   * @param  {string} password [User's password]
   */
  loginUser(email: string, password: string): any {
    return this.commonService.fireAuth.signInWithEmailAndPassword(email, password);
  }

  /**
   * [signupUser description]
   * This function will take the user's email and password and create a new account on the Firebase app, once it does
   * it's going to log the user in and create a node on userProfile/uid with the user's email address, you can use
   * that node to store the profile information.
   */
  signupUser(account: Account): any {
    return this.commonService.fireAuth.createUserWithEmailAndPassword(account.email, account.password).then(() => {
      this.commonService.fireAuth.currentUser.updateProfile({
          displayName: account.name
      }).then((newUser) => {
        this.commonService.userProfile.child(newUser.user.uid).set({
          country: account.country,
          city: account.city,
          address: account.address,
          zip: account.zip,  
          uid: newUser.user.uid,
          providerData: newUser.user.providerData,         
          createTimestamp: new Date().getTime()
        });
      });
    });
  }
  
  updateUser(account: Account): any {
    return this.commonService.fireAuth.currentUser.updateProfile({
      displayName: account.name
    }).then((user) => {
      console.log(user);
      this.commonService.userProfile.child(account.uid).update({
        country: account.country,
        city: account.city,
        address: account.address,
        zip: account.zip,      
        updateTimestamp: new Date().getTime()
      });
    });
  }

  /**
   * [resetPassword description]
   * This function will take the user's email address and send a password reset link, then Firebase will handle the
   * email reset part, you won't have to do anything else.
   *
   * @param  {string} email    [User's email address]
   */
  resetPassword(email: string): any {
    return this.commonService.fireAuth.sendPasswordResetEmail(email);
  }

  /**
   * This function doesn't take any params, it just logs the current user out of the app.
   */
  logoutUser(): any {
    return this.commonService.userProfile.child(this.commonService.currentUser.uid).update({      
      logoutTimestamp: new Date().getTime()
    }).then(() => { 
      return this.commonService.fireAuth.signOut();
    });
  }

  updatePassword(newPassword: string): any {
     return this.commonService.fireAuth.currentUser.updatePassword(newPassword);
  }

  googleLogin(): any {
    return this.commonService.fireAuth.signInWithRedirect(this.commonService.googleAuth);
  } 

}

