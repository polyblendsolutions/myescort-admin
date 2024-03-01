import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/common/user.interface';
import { UsersService } from 'src/app/services/common/users.service';
import { UiService } from 'src/app/services/core/ui.service';
import { ConfirmInputDailogComponent } from 'src/app/shared/components/ui/confirm-input-dailog/confirm-input-dailog.component';

@Component({
  selector: 'app-view-verification',
  templateUrl: './view-verification.component.html',
  styleUrls: ['./view-verification.component.scss']
})
export class ViewVerificationComponent implements OnInit {
  
  // Store Data
  id?: string;
  user?: User;

    // Subscriptions
    private subDataOne: Subscription;
    private subDataTwo: Subscription;
    private subRouteOne: Subscription;
    verification: any;  

  constructor(
    private spinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private uiService: UiService,
    private dialog: MatDialog,
    private router: Router, 
  ) { }

  ngOnInit(): void {
        // GET ID FORM PARAM
        this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
          this.id = param.get('id');
    
          if (this.id) {
            this.getUserById();
          }
        });
  }
  showModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
    console.log('this.showModal;', this.showModal)
  }

    /**
   * HTTP REQ HANDLE
   * getUserById()
   * verifyUserById()
   */
    private getUserById() {
      this.spinnerService.show();
      this.subDataOne = this.userService.getUsersById(this.id).subscribe({
        next: (res) => {
          this.spinnerService.hide();
          if (res.data) {
            this.user = res.data;
          }
        },
        error: (error) => {
          this.spinnerService.hide();
          this.uiService.warn(error.message);
        },
      });
    }
    public async verifyUserById(isVerify: boolean) {
      const payload = {
        isVerfied: isVerify,
        ...(isVerify ? {} : { comment: await this.openDialogAndGetInput() }),
      };
      if(isVerify || payload.comment){
        this.subDataTwo = this.userService.updateUsersById(this.id, payload).subscribe({
          next: (res) => {
            this.spinnerService.hide();
            this.uiService.success(res.message);
            this.router.navigate(['/user/user-list']);
          },
          error: (error) => {
            this.spinnerService.hide();
            this.uiService.warn(error.message);
          },
        });
      }
    }
    
    private async openDialogAndGetInput() {
      return new Promise<string>((resolve) => {
        const dialogRef = this.dialog.open(ConfirmInputDailogComponent, {
          width: '600px',
          height: '400px',
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            resolve(result);
          } else {
            resolve(null);
          }
        });
      });
    }
            
     /**
   * ON DESTROY
   */

  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
  } 
}
