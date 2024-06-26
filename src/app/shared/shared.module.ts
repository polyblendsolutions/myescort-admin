import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SnackbarNotificationComponent} from './components/ui/snackbar-notification/snackbar-notification.component';
import {ConfirmDialogComponent} from './components/ui/confirm-dialog/confirm-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {OutSideClickDirective} from './directives/out-side-click.directive';
import { ConfirmDialogWithCheckComponent } from './components/ui/confirm-dialog-with-check/confirm-dialog-with-check.component';
import { BodyTypeComponent } from './lazy/body-type/body-type.component';
import { ConfirmInputDailogComponent } from './components/ui/confirm-input-dailog/confirm-input-dailog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    SnackbarNotificationComponent,
    ConfirmDialogComponent,
    OutSideClickDirective,
    ConfirmDialogWithCheckComponent,
    BodyTypeComponent,
    ConfirmInputDailogComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    SnackbarNotificationComponent,
    ConfirmDialogComponent,
    OutSideClickDirective,
  ],
  providers: []
})
export class SharedModule {
}
