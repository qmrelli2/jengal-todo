import { NgFor } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { TaskItemComponent } from 'src/app/components/task-item/task-item.component';
import { ITask } from 'src/app/interfaces/task.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  standalone: true,
  imports: [TaskItemComponent, NgFor],
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage implements OnInit {
  //  backkgroundImg = 'assets/images/1.jpg';

  tasks!: ITask[];

  // @HostBinding('style.backgroundImage')
  // get getBackgroundImage() {
  //    return `url(${this.backkgroundImg})`;
  // }

  constructor(public dataService: DataService) {
    let num = Math.floor(Math.random() * (7 - 1 + 1) + 1);
    // this.backkgroundImg = 'assets/images/' + num + '.jpg';
  }

  ngOnInit() {}
}
