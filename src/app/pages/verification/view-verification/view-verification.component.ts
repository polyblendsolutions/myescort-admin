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
  verificationId?: string;
  verificationData?: User;

    // Subscriptions
    private subVerificationData: Subscription;
    private subVerificationUpdate: Subscription;
    private subVerificationRoute: Subscription;
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
        this.subVerificationRoute = this.activatedRoute.paramMap.subscribe((param) => {
          this.verificationId = param.get('id');
    
          if (this.verificationId) {
            this.getUserById();
          }
        });
  }
  showModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

    /**
   * HTTP REQ HANDLE
   * getUserById()
   * verifyUserById()
   */
    private getUserById() {
      this.spinnerService.show();
      this.subVerificationData = this.userService.getUsersById(this.verificationId).subscribe({
        next: (res) => {
          this.spinnerService.hide();
          if (res.data) {
            this.verificationData = res.data;
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
        verifiedStatus: isVerify?2:3,
        ...(isVerify ? {} : { comment: await this.openDialogAndGetInput() }),
      };
      if(isVerify || payload.comment){
        this.subVerificationUpdate = this.userService.updateUsersById(this.verificationId, payload).subscribe({
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
    if (this.subVerificationData) {
      this.subVerificationData.unsubscribe();
    }
    if (this.subVerificationUpdate) {
      this.subVerificationUpdate.unsubscribe();
    }
    if (this.subVerificationRoute) {
      this.subVerificationRoute.unsubscribe();
    }
  } 
}
