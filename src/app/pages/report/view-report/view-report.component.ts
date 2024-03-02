import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription } from 'rxjs';
import { Report } from 'src/app/interfaces/common/report.interface';
import { ProductService } from 'src/app/services/common/product.service';
import { ReportService } from 'src/app/services/common/report.service';
import { UiService } from 'src/app/services/core/ui.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/ui/confirm-dialog/confirm-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss'],
})
export class ViewReportComponent implements OnInit {
  
  // Store Data
  reportId?: string;
  reporDetails: Report;

  // Subscriptions
  private subReportData: Subscription;
  private subdeleteResponse: Subscription;
  private subRouteReport: Subscription;
  verification: any;

  constructor(
    private spinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private reportService: ReportService,
    private uiService: UiService,
    private dialog: MatDialog,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // GET ID FORM PARAM
    this.subRouteReport = this.activatedRoute.paramMap.subscribe((param) => {
      this.reportId = param.get('id');

      if (this.reportId) {
        this.getReportById();
      }
    });
  }
  /**
   * Button Actions Methods
   * openExternalUrl()
   * deleteProductById()
   * deleteReportById()
   */
  public openExternalUrl(): void {
    const url = `https://${environment.domain}/ad-details/${this.reporDetails?.product}`;
    const newTab = window.open(url, '_blank');
    if (newTab) {
      newTab.focus();
    } else {
      this.uiService.warn('Unable to open new tab. Please check your browser settings.');
    }
  }

  public deleteProductById() {
    this.confirmDeletion(
      'Confirm Delete',
      'Are you sure you want to delete this Ad?',
      this.productService.deleteProductById(this.reporDetails?.product)
    );
  }
  
  public deleteReportById() {
    this.confirmDeletion(
      'Confirm Delete',
      'Are you sure you want to delete this Report?',
      this.reportService.deleteReportById(this.reportId)
    );
  }
  
  /**
   * HTTP REQ HANDLE
   * getReportById()
   * deleteAd()
   * confirmDeletion()
   */
  private getReportById() {
    this.spinnerService.show();
    this.subReportData = this.reportService.getReportById(this.reportId).subscribe({
      next: (res) => {
        this.spinnerService.hide();
        if (res.data) {
          this.reporDetails = res.data;
        }
      },
      error: (error) => {
        this.spinnerService.hide();
        this.uiService.warn(error.message);
      },
    });
  }
  
  private confirmDeletion(title: string, message: string, deletionObservable: Observable<any>) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: { title, message },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.spinnerService.show();
        this.subdeleteResponse = deletionObservable.subscribe(
          (res) => {
            this.spinnerService.hide();
            if (res.success) {
              this.router.navigate(['/report/all-report']);
              this.uiService.success(res.message);
            } else {
              this.uiService.warn(res.message);
            }
          },
          (error) => {
            this.spinnerService.hide();
            this.uiService.warn(error.message);
          }
        );
      }
    });
  }
  
  /**
   * ON DESTROY
   */

  ngOnDestroy() {
    if (this.subReportData) {
      this.subReportData.unsubscribe();
    }
    if (this.subdeleteResponse) {
      this.subdeleteResponse.unsubscribe();
    }    
    if (this.subRouteReport) {
      this.subRouteReport.unsubscribe();
    }
  }
}
