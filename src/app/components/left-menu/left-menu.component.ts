import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-left-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatDivider
  ],
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.css'
})
export class LeftMenuComponent {

}
