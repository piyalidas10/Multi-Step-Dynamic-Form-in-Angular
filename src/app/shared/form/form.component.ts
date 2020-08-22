import { Component, OnInit, Input, ElementRef, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import {Formtype} from '../enums/Formtype';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnChanges {
  @Input() countSteps;
  @Input() stepNo;
  @Input() formFields;
  @Input() formValues;
  @Input() stepName;
  @Output() formData = new EventEmitter<any>();
  formName: any;
  @Output() newStep = new EventEmitter<any>();
  gender = '1';
  constructor(private el: ElementRef) { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.formFields);
    this.getFormName();
    console.log(this.countSteps);
    console.log(this.stepNo);
  }

  getFormName() {
    this.formName = Object.keys(Formtype).find(key => Formtype[key] === this.stepName);
    console.log(this.formName);
    console.log(this.formValues);
    if (this.formName) {
      this.createForm();
    }
  }

  createForm() {
    this.formName = new FormGroup({});
    if (this.formName && Object.keys(this.formValues).length > 0) {
      console.log(this.formName);
      setTimeout(() => {
        this.formName.patchValue(this.formValues);
      }, );
    }
    this.validateForm();
  }

  validateForm() {
    this.formFields.forEach(element => {
      const validatorsArr: ValidatorFn[] = [];
      if (element.valids.length > 0) {

        element.valids.forEach(val => {
          if (val.valid === 'required' || val.valid === 'email') {
            validatorsArr.push(Validators[val.valid]);
          }
          if (val.valid === 'pattern') {
            validatorsArr.push(
              Validators.pattern(val.validator)
            );
         }
         if (val.valid === 'minlength') {
            validatorsArr.push(
              Validators.minLength(val.length)
            );
          }
        });

        this.formName.addControl(element.key, new FormControl('', validatorsArr));
      } else {
        this.formName.addControl(element.key, new FormControl(''));
      }
      console.log('validatorsArr => ', validatorsArr);
    });
  }

  submitForm() {
    const invalidElements = this.el.nativeElement.querySelectorAll('.form-control.ng-invalid');
    console.log('invalidElements => ', invalidElements);
    if (invalidElements.length > 0) {
      invalidElements[0].focus();
    } else {
      console.log('Form details => ', this.formName.value);
      const obj = Object.assign(this.formName.value, {'formName': this.stepName});
      this.formData.emit(obj);
      this.newStep.emit(this.stepNo + 1);
    }
  }

  gotoStep(stepNo) {
    console.log(stepNo);
    this.newStep.emit(stepNo);
  }


}
