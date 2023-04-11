import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IList } from 'src/app/interfaces/list.interface';
import { DataService } from 'src/app/services/data.service';
import { TaskItemComponent } from 'src/app/components/task-item/task-item.component';
import { ITask } from 'src/app/interfaces/task.interface';
import { NgFor, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [TaskItemComponent, NgFor, FormsModule, TitleCasePipe],
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
})
export class ListPage implements OnInit {
  backkgroundImg = 'assets/images/1.jpg';
  listId: any;
  listTitle!: string | undefined;
  tasks!: ITask[];

  newTaskTitle = '';

  @HostBinding('style.backgroundImage')
  get getBackgroundImage() {
    return `url(${this.backkgroundImg})`;
  }

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((res) => {
      let num = Math.floor(Math.random() * (7 - 1 + 1) + 1);
      this.backkgroundImg = 'assets/images/' + num + '.jpg';

      this.listId = res.get('id');

      this.getTasks();
    });
  }

  ngOnInit() {}

  getTasks() {
    this.tasks = [];
    this.dataService.$tasks.subscribe((res) => {
      if (this.listId === 'all') {
        this.listTitle = 'All Tasks';
        this.tasks = res;
      } else if (this.listId === 'favorites') {
        this.tasks = res.filter((task: ITask) => {
          this.listTitle = 'Favorite Tasks';
          return task.favorite === true;
        });
      } else if (this.listId === 'done') {
        this.tasks = res.filter((task: ITask) => {
          this.listTitle = 'Completed Tasks';
          return task.done === true;
        });
      } else {
        this.listTitle = this.dataService.getList(Number(this.listId))?.title;

        this.tasks = res.filter((task: ITask) => {
          return task.listId === Number(this.listId);
        });
      }
    });
  }

  onKeyup(eventData: any) {
    if (eventData.key === 'Enter' && this.newTaskTitle) {
      this.createNewTask();
    }
  }

  createNewTask() {
    this.dataService.createTask(this.newTaskTitle, Number(this.listId));
    this.newTaskTitle = '';
  }
}
