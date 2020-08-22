import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @Input() allFormsData;
  groupObjKeys = [];
  groupObjValues = [];
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.getValue();
  }

  getValue() {
    const groupArr = this.allFormsData.reduce((accumulator, currentValue) => {
      const key = currentValue['formName'];
      if (!accumulator[key]) {
          accumulator[key] = [];
      }
      accumulator[key].push(currentValue);
      return accumulator;
    }, {});
    console.log(groupArr);
    this.createTable(groupArr);
  }

  createTable(groupArr) {
    const div = this.renderer.createElement('div');
    this.renderer.addClass(div, 'result');
    const table = this.renderer.createElement('table');
    this.renderer.addClass(table, 'table');
    this.renderer.addClass(table, 'table-bordered');
    let data = '';
    this.groupObjKeys = Object.keys(groupArr);
    console.log(this.groupObjKeys);
        for (let i = 0; i < this.groupObjKeys.length; i++) {
          const objKeys = Object.keys(groupArr[this.groupObjKeys[i]][0]);
          console.log(objKeys);
            data += '<tr><th colspan=' + objKeys.length + '>' + this.groupObjKeys[i] + '</th></tr>';
                data += '<tr>';
                for (let k = 0; k < objKeys.length; k++) {
                        data += '<th>' + objKeys[k] + '</th>';
                }
                data += '</tr>';
                for (let j = 0; j < groupArr[this.groupObjKeys[i]].length; j++) {
                    data += '<tr>';
                    for (let k = 0; k < objKeys.length; k++) {
                        data += '<td>' + groupArr[this.groupObjKeys[i]][j][objKeys[k]] + '</td>';
                    }
                    data += '</tr>';
                }
        }
        this.renderer.setProperty(table, 'innerHTML', data);
        this.renderer.appendChild(div, table);
        this.renderer.appendChild(this.elementRef.nativeElement, div);
  }

}
