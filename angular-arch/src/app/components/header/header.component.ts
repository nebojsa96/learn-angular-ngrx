import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class HeaderComponent implements OnInit {

  @Input() isAuthorized: boolean | null = false;
  @Output() signOut: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSignOut(): void {
    this.signOut.next();
  }

}
