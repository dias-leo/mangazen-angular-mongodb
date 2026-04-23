import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-site',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-site.html',
  styleUrl: './header-site.scss'
})
export class HeaderSiteComponent {}
