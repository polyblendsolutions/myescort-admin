import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-input-dailog',
  templateUrl: './confirm-input-dailog.component.html',
  styleUrls: ['./confirm-input-dailog.component.scss']
})
export class ConfirmInputDailogComponent implements OnInit {
  form: any;

  constructor(public dialogRef: MatDialogRef<ConfirmInputDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { inputValue: string },
    private fb: FormBuilder // Inject FormBuilder
    ) { 
      this.form = this.fb.group({
        inputValue: ['', [Validators.required]]
      });
    }
  
  ngOnInit(): void {
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
