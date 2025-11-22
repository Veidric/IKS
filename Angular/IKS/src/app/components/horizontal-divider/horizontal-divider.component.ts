import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-horizontal-divider',
  templateUrl: './horizontal-divider.component.html',
  styleUrls: ['./horizontal-divider.component.css']
})
export class HorizontalDividerComponent {
  @Input() margin: string = '1em';
  @Input() color: string = 'var(--text-darker)';
}
