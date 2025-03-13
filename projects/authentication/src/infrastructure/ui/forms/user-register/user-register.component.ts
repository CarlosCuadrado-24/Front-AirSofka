import { Component, inject, Input, OnInit, Output, OnChanges, SimpleChanges, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../../../domain/model/user.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'lib-user-register',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})

export class UserRegisterComponent {
  private formBuilder = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  @Input() user: IUser | null = null;

  @Output() onSubmit = new EventEmitter<IUser>();


  public form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    documentId: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d+$/)]],
    nacionality: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/)]]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']?.currentValue) {
      this.updateForm();
    }
  }

  private updateForm(): void {
    if (this.user) {
      this.form.patchValue(this.user);
      this.cdr.detectChanges();
    }
  }

  Submit(event: Event) {
    event.preventDefault();
    if (!this.form.valid) {
      console.log("formulario invalido");
    } else {
      this.onSubmit.emit(this.form.getRawValue());
    }
  }

}
