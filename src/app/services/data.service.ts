import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IList } from '../interfaces/list.interface';
import { ITask } from '../interfaces/task.interface';

@Injectable({ providedIn: 'root' })
export class DataService {
  private lists = new BehaviorSubject<IList[]>([]);
  $lists = this.lists.asObservable();

  private tasks = new BehaviorSubject<ITask[]>([]);
  $tasks = this.tasks.asObservable();

  searchResults: ITask[] = [];

  constructor() {
    this.createList('Default List', true);
    this.createTask('This is a task sample.', 1);
    this.createTask('This is a task sample 2.', 1, true, true);
  }

  createList(title: string, locked: boolean = false) {
    let list: IList = {
      id: this.lists.value.length + 1,
      title,
      locked,
    };

    this.lists.next([...this.lists.value, list]);
  }

  getList(id: number) {
    return this.lists.value.find((list: IList) => {
      return list.id === id;
    });
  }

  createTask(
    title: string,
    listId: number,
    favorite: boolean = false,
    done: boolean = false
  ) {
    let task: ITask = {
      id: this.tasks.value.length + 1,
      title,
      favorite,
      done,
      listId,
      dateCreated: Date.now().toString(),
    };

    this.tasks.next([...this.tasks.value, task]);
  }

  makeSearch(phrase: string) {
    this.searchResults = this.tasks.value.filter((task: ITask) => {
      return task.title.toLowerCase().includes(phrase.toLowerCase());
    });
  }
}
