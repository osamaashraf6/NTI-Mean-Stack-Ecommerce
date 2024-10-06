import { Component } from '@angular/core';
import { AsideLeftComponent } from '../../components/aside-left/aside-left.component';
import { AsideCenterComponent } from '../../components/aside-center/aside-center.component';
import { AsideRightComponent } from '../../components/aside-right/aside-right.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [AsideLeftComponent, AsideCenterComponent, AsideRightComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {}
