import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horizontal-divider',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './horizontal-divider.component.html',
  styleUrls: ['./horizontal-divider.component.css']
})
export class HorizontalDividerComponent {
  @Input() margin: string = '1em';
  @Input() color: string = 'var(--text-darker)';
}
