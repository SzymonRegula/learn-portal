import { Component, HostBinding, Input, OnInit } from '@angular/core';

type ButtonType = 'submit' | 'button' | 'reset';
type StyleType =
  | 'prime'
  | 'prime-transparent'
  | 'prime-border'
  | 'secondary'
  | 'important'
  | 'neutral-transparent';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements OnInit {
  @Input() type: ButtonType = 'submit';
  @Input() styleType: StyleType = 'prime';
  @Input() customStyle?: { [key: string]: string | number };
  @Input() disabled = false;
  classExpression = 'button';

  @HostBinding('attr.tabindex') tabindex = -1;

  ngOnInit(): void {
    this.classExpression = `button button--${this.styleType}`;
  }
}
