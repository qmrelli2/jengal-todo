import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ListFormComponent } from '../list-form/list-form.component';
import { ProfileComponent } from '../profile/profile.component';
import { SearchboxComponent } from '../searchbox/searchbox.component';

@Component({
  standalone: true,
  imports: [
    ProfileComponent,
    SearchboxComponent,
    ListFormComponent,
    NgFor,
    NgIf,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
  ],
  selector: 'sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  defaultLists = [
    {
      icon: 'assets/icons/all.svg',
      title: 'All',
      path: 'all',
    },
    {
      icon: 'assets/icons/star.svg',
      title: 'Favorites',
      path: 'favorites',
    },
    {
      icon: 'assets/icons/done.svg',
      title: 'Done',
      path: 'done',
    },
  ];

  showListForm = false;

  constructor(public dataService: DataService) {}

  ngOnInit() {}

  onNewList() {
    this.showListForm = true;
  }

  onCloseForm() {
    this.showListForm = false;
  }
}
