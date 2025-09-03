import { Component } from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {LeftMenuComponent} from '../../components/left-menu/left-menu.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-secure',
  standalone: true,
  imports: [
    HeaderComponent,
    LeftMenuComponent,
    RouterOutlet
  ],
  templateUrl: './secure.component.html',
  styleUrl: './secure.component.css'
})
export class SecureComponent {

}
