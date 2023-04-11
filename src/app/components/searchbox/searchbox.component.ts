import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'searchbox',
  templateUrl: 'searchbox.component.html',
  styleUrls: ['searchbox.component.scss'],
})
export class SearchboxComponent implements OnInit {
  phrase = '';

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {}

  onChange(event: any) {
    if (event) {
      this.dataService.makeSearch(event);
      this.router.navigate(['search']);
    } else {
      this.router.navigate(['']);
    }
  }
}
