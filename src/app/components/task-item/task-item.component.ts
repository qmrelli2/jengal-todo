import { DatePipe, NgIf } from '@angular/common';
import {
  Component,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { ITask } from 'src/app/interfaces/task.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  standalone: true,
  imports: [NgIf, DatePipe],
  selector: 'task-item',
  templateUrl: 'task-item.component.html',
  styleUrls: ['task-item.component.scss'],
  host: {
    '[class.done]': 'task.done',
  },
})
export class TaskItemComponent implements OnInit {
  @Input() task!: ITask;

  @HostListener('click', ['$event.target'])
  onClick() {
    this.task.done = !this.task.done;
  }

  constructor(private dataService: DataService) {}

  ngOnInit() {}

  onFavorite(event: Event) {
    event.stopPropagation();
    this.task.favorite = !this.task.favorite;
  }

  onDelete(event: Event) {
    this.dataService.removeTask(this.task.id);
  }
}
