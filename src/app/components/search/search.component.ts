import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  search = new FormControl('');
  @Output('search') searchEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(value => {
      this.searchEmitter.emit(value);
    });
  }

}
