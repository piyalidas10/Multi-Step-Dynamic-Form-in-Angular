import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
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
