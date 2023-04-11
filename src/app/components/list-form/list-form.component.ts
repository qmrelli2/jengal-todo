import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'list-form',
  templateUrl: 'list-form.component.html',
  styleUrls: ['list-form.component.scss'],
})
export class ListFormComponent implements OnInit {
  @Output() closeForm = new EventEmitter();
  title = '';

  @ViewChild('input', { static: false })
  set input(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }

  constructor(private dataService: DataService) {}

  ngOnInit() {}

  onKeyup(eventData: any) {
    if (eventData.key === 'Enter' && this.title) {
      this.dataService.createList(this.title);
      this.closeForm.emit();
    } else if (eventData.key === 'Backspace') {
      if (this.title.length === 0) {
        this.closeForm.emit();
      }
    } else if (eventData.key === 'Escape') {
      this.closeForm.emit();
    }
  }
}
