import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //Solo tiene en cuenta los cambios cuando se hace un push de un componente
  //padre o cuando hay un click o un evento del dom, pero si hago 
  // this.filterValue = value no le hará caso a no ser que que le ponga otro 
  // behaviorSubject.
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'search';
  users = new BehaviorSubject<any>([]);
  filterValue = new BehaviorSubject<string>('');

  constructor(private _http: HttpClient) { }

  search(value: string) {
    this.filterValue.next(value); 
  }

  ngOnInit() {
    this._http.get('https://jsonplaceholder.typicode.com/users').subscribe((users: any[]) => {
      this.users.next(users);
    })
  }

}
