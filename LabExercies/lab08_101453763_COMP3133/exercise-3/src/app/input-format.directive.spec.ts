import { InputFormatDirective } from './input-format.directive';
import { ElementRef } from '@angular/core';

describe('InputFormatDirective', () => {
  let element: HTMLInputElement;
  let elementRef: ElementRef;

  beforeEach(() => {
    // Create a dummy input element to test the directive.
    element = document.createElement('input');
    elementRef = new ElementRef(element);
  });

  it('should create an instance', () => {
    const directive = new InputFormatDirective(elementRef);
    expect(directive).toBeTruthy();
  });

  it('should convert text to uppercase on blur', () => {
    const directive = new InputFormatDirective(elementRef);
    element.value = 'hello world';
    directive.onBlur();
    expect(element.value).toBe('HELLO WORLD');
  });

  it('should convert text to uppercase on Enter keydown', () => {
    const directive = new InputFormatDirective(elementRef);
    element.value = 'angular test';
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    spyOn(event, 'preventDefault');
    directive.onEnter(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(element.value).toBe('ANGULAR TEST');
  });
});
