import {AfterViewInit, Directive, ElementRef, Input, NgZone, OnChanges, OnDestroy} from '@angular/core';
import Inputmask from 'inputmask';

const prefixes: Record<string, string> = {
  RUB: '₽ ',
  USD: '$ ',
  EUR: '€ '
};

@Directive({
  selector: '[appCurrencyMask]'
})
export class CurrencyMaskDirective implements AfterViewInit, OnChanges, OnDestroy {
  @Input() currency = '';
  @Input() allowMinus = false;
  @Input() digits?: number;

  constructor(private elRef: ElementRef, private zone: NgZone) {}

  ngAfterViewInit() {
    this.createMask();
  }

  ngOnChanges() {
    Inputmask.remove(this.elRef.nativeElement);
    this.createMask();
  }

  ngOnDestroy() {
    Inputmask.remove(this.elRef.nativeElement);
  }

  private createMask() {
    this.zone.runOutsideAngular(() => {
      Inputmask('numeric', {
        rightAlign: false,
        radixPoint: ',',
        groupSeparator: ' ',
        autoUnmask: true,
        allowMinus: this.allowMinus,
        prefix: prefixes[this.currency] || '',
        unmaskAsNumber: true,
        placeholder: ' ',
        digits: this.digits,
        onBeforeMask: value => String(value).replace('.', ','),
      }).mask(this.elRef.nativeElement);
    });
  }
}
