# Tooltip-Component-Angular-6
Dynamically Loaded Tooltip by Angular-6

### Run the application
```
ng serve
localhost:4200
```
    

### App Component
Four tooltips with four directions. Sending 3 inputs (tooltipDirection, title, tooltipData) to tooltip-box diective 

### app.component.html

    <div class="row">
      <div class="col-12">
        <ul role="list">
          <li role="listitem">
            <div class="tooltipbox">
              <span>Tooltip Left side</span>
              <button aria-haspopup="true" tooltip-box [tooltipDirection]="'left'" [title]="tooltipObj1.title" [tooltipData]="tooltipObj1.content">
                <i class="fa fa-info-circle" aria-hidden="true"></i>
                <span class="sr-only">{{tooltipObj1.title}}</span>
              </button>
            </div>
          </li>
          <li role="listitem">
            <div class="tooltipbox">
              <span>Tooltip Right side</span>
              <button aria-haspopup="true" tooltip-box [tooltipDirection]="'right'" [title]="tooltipObj2.title" [tooltipData]="tooltipObj2.content">
                <i class="fa fa-info-circle" aria-hidden="true"></i>
                <span class="sr-only">{{tooltipObj2.title}}</span>
              </button>
            </div>
          </li>
          <li role="listitem">
            <div class="tooltipbox">
              <span>Tooltip Top side</span>
              <button aria-haspopup="true" tooltip-box [tooltipDirection]="'top'" [title]="tooltipObj3.title" [tooltipData]="tooltipObj3.content">
                <i class="fa fa-info-circle" aria-hidden="true"></i>
                <span class="sr-only">{{tooltipObj3.title}}</span>
              </button>
            </div>
          </li>
          <li role="listitem">
            <div class="tooltipbox">
              <span>Tooltip Bottom side</span>
              <button aria-haspopup="true" tooltip-box [tooltipDirection]="'bottom'" [title]="tooltipObj4.title" [tooltipData]="tooltipObj4.content">
                <i class="fa fa-info-circle" aria-hidden="true"></i>
                <span class="sr-only">{{tooltipObj4.title}}</span>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>


### app.component.ts
Have four object values for four tooltips with title and content

    export class AppComponent implements OnInit {
      tooltipObj1: any;
      tooltipObj2: any;
      tooltipObj3: any;
      tooltipObj4: any;


      ngOnInit() {
        this.tooltipObj1 = {
            title: 'Tooltip Heading One',
            content: 'Lorem Ipsum is simply dummy text of the printing and <a href="#">typesetting industry</a>.'
        };
        this.tooltipObj2 = {
          title: 'Tooltip Heading Two',
          content: 'Lorem Ipsum is simply dummy text of the printing and <a href="#">typesetting industry</a>.'
        };
        this.tooltipObj3 = {
          title: 'Tooltip Heading Three',
          content: 'Lorem Ipsum is simply dummy text of the printing and <a href="#">typesetting industry</a>.'
        };
        this.tooltipObj4 = {
          title: 'Tooltip Heading Four',
          content: 'Lorem Ipsum is simply dummy text of the printing and <a href="#">typesetting industry</a>.'
        };
      }

    }

### app.module.ts

    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { HttpClientModule } from '@angular/common/http';

    import { AppComponent } from './app.component';
    import { TooltipComponent } from './tooltip/tooltip.component';
    import { TooltipDirective } from './tooltip.directive';

    @NgModule({
      declarations: [
        AppComponent,
        TooltipDirective,
        TooltipComponent
      ],
      providers: [],
      imports: [
        BrowserModule,
        HttpClientModule
      ],
      entryComponents: [
        TooltipComponent
      ],
      bootstrap: [AppComponent]
    })
    export class AppModule { }


entryComponent is used for components declaration which will be loaded dynamically.

## Tooltip Directive
### tooltip.directive.ts

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

@HostListener() function decorator allows you to handle events of the host element in the tooltip directive. 
1.  @HostListener('mouseover', ['$event']) ----- when you hover you mouse over the host element, tooltip component will be created by using openTooltip().
2.  @HostListener('mouseout', ['$event']) ----- when you hover you mouse out the host element, tooltip component will be closed by using closeTooltip().
3.  @HostListener('focus', ['$event']) ----- when you focus on the host element, tooltip component will be created by using openTooltip().
4.  @HostListener('blur', ['$event']) ----- when you focus out the host element, tooltip component will be closed by using closeTooltip().


createtooltipDialog() function is used to create tooltip componenet dynamically. You have to send TooltipComponent through resolveComponenetFactory to create factory then will create component using createComponent function. We are fetching values of tooltipDirection, title, tooltipData from tooltipbox div which were declared in app.componenet.html. These value are sending using tooltipComponentRef.instance to tooltip.componenet.ts. 

closeTooltip() is used to destroy the tooltip component from DOM element.



## Tooltip Component
### tooltip.component.html

    <div class="tooltiptext {{tooltipDirection}}"  role="tooltip" [innerHTML]="tooltipData">
    </div>


### tooltip.component.ts

    import { Component, OnInit, Input } from '@angular/core';

    @Component({
      selector: 'app-tooltip',
      templateUrl: './tooltip.component.html',
      styleUrls: ['./tooltip.component.css']
    })
    export class TooltipComponent implements OnInit {
      @Input() tooltipDirection: string;
      @Input() title: string;
      @Input() tooltipData: string;
      constructor() { }

      ngOnInit() {
      }

    }



