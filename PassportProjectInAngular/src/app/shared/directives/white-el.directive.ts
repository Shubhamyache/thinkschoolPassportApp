import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appWhiteEl]',
  standalone: true,
})
export class WhiteElDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {
    // this.renderer.setStyle(this.element.nativeElement, 'color', 'red');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.element.nativeElement, 'position', 'relative');
    this.addBox();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.removeBox();
  }

  private addBox() {
    const box = this.renderer.createElement('div');
    this.renderer.setAttribute(box, 'class', 'hover-box');
    this.renderer.appendChild(this.element.nativeElement, box);
    this.renderer.setStyle(box, 'position', 'absolute');
    this.renderer.setStyle(box, 'top', '0');
    this.renderer.setStyle(box, 'left', '0');
    this.renderer.setStyle(box, 'width', '100%');
    this.renderer.setStyle(box, 'height', '100%');
    this.renderer.setStyle(box, 'border', '2px solid blue');
    this.renderer.setStyle(box, 'box-sizing', 'border-box');
    this.renderer.setStyle(box, 'animation', 'hoverAnimation 0.3s ease-in-out');
  }

  private removeBox() {
    const box = this.element.nativeElement.querySelector('.hover-box');
    if (box) {
      this.renderer.removeChild(this.element.nativeElement, box);
    }
  }
}
