import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddressesService } from '../../services/addresses.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aside-center',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './aside-center.component.html',
  styleUrl: './aside-center.component.scss',
})
export class AsideCenterComponent implements OnInit, OnDestroy {
  openUpdateUser = false;
  openChangePassword = false;
  openCreateAddress = false;
  openUpdateAddress = false;
  subscription: any;
  addresses: any[] = [];
  user: any = {};
  toastMessage: string = '';
  userImg: string = '';
  invalidAddressForm: string = '';
  //
  profileImg: any = '';
  name: string = '';
  phone: string = '';
  //
  addressIdQuery: string = '';
  addressForm: FormGroup = new FormGroup({
    street: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    state: new FormControl(null, [Validators.required]),
    postalCode: new FormControl(null, [Validators.required]),
  });

  //
  getImage(event: any) {
    const image = event.target.files[0];
    if (image) {
      this.profileImg = image;
    }
    console.log(image);
  }
  //
  passwordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
  });
  constructor(
    private _AddressesService: AddressesService,
    private _UsersService: UsersService,
    private _AuthService: AuthService
  ) {}
  toggleUpdateUser() {
    this.openUpdateUser = !this.openUpdateUser;
  }
  toggleChangePassword() {
    this.openChangePassword = !this.openChangePassword;
  }
  toggleCreateAddress() {
    this.openCreateAddress = !this.openCreateAddress;
  }
  toggleUpdateAddress(id: string) {
    this.openUpdateAddress = !this.openUpdateAddress;
    this.addressIdQuery = id;
    console.log(this.addressIdQuery);
  }
  getAddress() {
    this.subscription = this._AddressesService.getAllAddress().subscribe({
      next: (res) => {
        this.addresses = res.data;
      },
      error: (err) => {},
    });
  }
  addAddress(formData: FormGroup) {
    this._AddressesService.addAddress(formData.value).subscribe({
      next: (res) => {
        alert('Address added successfully');
        this.toastMessage = 'Address added successfully';
        this.getAddress();
      },
      error: (err) => {
        this.invalidAddressForm = err.error.message;
        console.log(err);
      },
    });
  }

  updateAddress(addressId: string, formData: FormGroup) {
    this._AddressesService.updateAddress(addressId, formData.value).subscribe({
      next: (res) => {
        alert('Address updated successfully');
        this.toastMessage = 'Address updated successfully';
        this.getAddress();
      },
      error: (err) => {
        console.log(err);
        // this.invalidAddressForm =
      },
    });
  }
  removeAdress(addressId: string) {
    this._AddressesService.removeAddress(addressId).subscribe({
      next: (res) => {
        alert('Address removed successfully');
        this.toastMessage = 'Address removed successfully';
        this.getAddress();
      },
      error: (err) => {
        // this.invalidAddressForm =
      },
    });
  }
  changeUserPasswordByUserHimSelf(formData: FormGroup) {
    this._UsersService
      .changeUserPasswordByUserHimSelf(formData.value)
      .subscribe({
        next: (res) => {
          alert('Password has been changed successfully');
          localStorage.setItem('user', res.token);
          this._AuthService.getAndDecodeAndSaveAtCurrentUser();
        },
        error: (err) => {},
      });
  }
  getUserProfileByHimSelf() {
    this._UsersService.getUserProfileByHimSelf().subscribe({
      next: (res) => {
        this.user = res.data;
      },
      error: (err) => {},
    });
  }
  updateUserProfileByHimSelf(event: any) {
    event.preventDefault();
    const userForm = new FormData();
    if (this.name) {
      userForm.append('name', this.name);
    }
    if (this.phone) {
      userForm.append('phone', this.phone);
    }
    if (this.profileImg) {
      userForm.append('profileImg', this.profileImg);
    }
    this._UsersService.updateUserProfileByHimSelf(userForm).subscribe({
      next: () => {
        alert('Profile has been updated successfully');
        this.getUserProfileByHimSelf();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    this.getAddress();
    this.getUserProfileByHimSelf();
    this.userImg = this._UsersService.userImg;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
