import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() isExpanded = false;
  @Output() isExpandedChange = new EventEmitter<boolean>();

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
    this.isExpandedChange.emit(this.isExpanded);
  }
}
