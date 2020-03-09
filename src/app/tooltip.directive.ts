import {
  Directive, Input, Output, EventEmitter, ElementRef,
  HostListener, Renderer2, ViewContainerRef, ComponentFactoryResolver, OnInit, OnChanges
} from '@angular/core';
import { TooltipComponent } from './tooltip/tooltip.component';

@Directive({
  selector: '[tooltip-box]'
})
export class TooltipDirective implements OnInit, OnChanges {
  @Input() tooltipDirection: string;
  @Input() title: string;
  @Input() tooltipData: string;
  tooltipElement: any;
  tooltipComponentRef: any;

  constructor(
    private el: ElementRef,
    private ren: Renderer2,
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  @HostListener('mouseover', ['$event'])
  mouseOver() {
    this.openTooltip();
  }


  @HostListener('mouseout', ['$event'])
  mouseOut() {
    this.closeTooltip();
  }

  @HostListener('focus', ['$event'])
  focusMove() {
    this.openTooltip();
  }

  @HostListener('blur', ['$event'])
  focusOut() {
    this.closeTooltip();
  }

  /* tooltip create */
  openTooltip() {
    console.log('Tooltip directive is called.');
    this.tooltipElement = this.el.nativeElement;
    this.ren.setAttribute(this.tooltipElement, 'tabindex', '0');
    this.ren.setAttribute(this.tooltipElement, 'aria-haspopup', 'true');
    console.log('tooltipElement => ', this.tooltipElement);
    this.createtooltipDialog(TooltipComponent);
  }

  createtooltipDialog(comp) {
    console.log('CreatetooltipDialog is called');
    this.viewContainer.clear();
    const TooltipComponentFactory = this.componentFactoryResolver.resolveComponentFactory(comp);
    this.tooltipComponentRef = this.viewContainer.createComponent(TooltipComponentFactory);
    this.tooltipComponentRef.instance['tooltipDirection'] = this.tooltipDirection;
    this.tooltipComponentRef.instance['title'] = this.title;
    this.tooltipComponentRef.instance['tooltipData'] = this.tooltipData;
    return this.tooltipComponentRef;
  }

  closeTooltip() {
    this.tooltipComponentRef.destroy();
  }


}
