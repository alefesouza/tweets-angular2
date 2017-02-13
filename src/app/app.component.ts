import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DrawerItem } from './shared/models/drawer-item.model';

const items = [
    new DrawerItem("Início", "home", "home", ""),
    new DrawerItem("Twitter", "tweets", "", "assets/twitter.png")
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Tweets Angular 2';

  @ViewChild('sidenav') sideNav;

  drawerItems: DrawerItem[] = items;
  selectedDrawerItem : DrawerItem;

  constructor(private router: Router) {}

  ngOnInit(): void {
    var holder;

    // Amo C#
    setTimeout(() => {
      var replace = this.router.url.replace("/", "");

      items.forEach(function(obj) {
        if(obj.link == replace) {
          // Melhor forma que eu achei, se colocar this.selectedDrawerItem aqui da undefined
          holder = obj;
        }
      });
    
      if(holder == undefined) {
        holder = items[0];
      }

      this.selectedDrawerItem = holder;
    }, 500);
  }

  changePage(drawerItem: DrawerItem): void {
    this.sideNav.toggle();
    this.selectedDrawerItem = drawerItem;
  }
}
