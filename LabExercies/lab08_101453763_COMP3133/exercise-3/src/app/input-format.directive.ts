import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[customInputFormat]'
})
export class InputFormatDirective {
  constructor(private el: ElementRef) {}

  // Listen for each keystroke
  @HostListener('input')
  onInput(): void {
    const currentValue: string = this.el.nativeElement.value;
    // Update the input's value to uppercase immediately
    this.el.nativeElement.value = currentValue.toUpperCase();
  }
}
