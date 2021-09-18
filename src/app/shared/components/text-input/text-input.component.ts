import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

//Original: https://notiz.dev/blog/floating-form-field-with-tailwindcss
@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextInputComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
