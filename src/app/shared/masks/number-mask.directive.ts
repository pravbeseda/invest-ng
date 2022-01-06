import { AfterViewInit, Directive, ElementRef, NgZone, Input, OnDestroy } from '@angular/core';
import Inputmask from 'inputmask';

@Directive({
  selector: '[appNumberMask]',
})
export class NumberMaskDirective implements OnDestroy, AfterViewInit {
  @Input() decimal = false;
  @Input() positiveNumber = true;
  @Input() decimals = 0;
  constructor(private elRef: ElementRef, private zone: NgZone) {}

  ngOnDestroy() {
    Inputmask.remove(this.elRef.nativeElement);
  }

  ngAfterViewInit() {
    this.createMask();
  }

  private createMask() {
    this.zone.runOutsideAngular(() => {
      Inputmask('numeric', {
        regex: this.addRegex(),
        placeholder: '',
        groupSeparator: ' ',
        rightAlign: false,
        onBeforeMask: val => String(val).trim(),
      }).mask(this.elRef.nativeElement);
    });
  }

  private addRegex(): string {
    if (this.decimal) {
      return `^${this.positiveNumber ? '' : '-?'}\\d+\\.?\\d${this.decimals ? `{${this.decimals}}` : '*'}$`;
    } else if (this.positiveNumber) {
      return '^\\d+$';
    } else {
      return '-?\\d+';
    }
  }
}
