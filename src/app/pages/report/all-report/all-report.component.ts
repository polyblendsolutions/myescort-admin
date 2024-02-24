import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EMPTY, Subscription, debounceTime, distinctUntilChanged, pluck, switchMap } from 'rxjs';
import { AdminPermissions } from 'src/app/enum/admin-permission.enum';
import { Report } from 'src/app/interfaces/common/report.interface';
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { Pagination } from 'src/app/interfaces/core/pagination';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ReportService } from 'src/app/services/common/report.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import { UiService } from 'src/app/services/core/ui.service';
import { UtilsService } from 'src/app/services/core/utils.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/ui/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-all-report',
  templateUrl: './all-report.component.html',
  styleUrls: ['./all-report.component.scss']
})
export class AllReportComponent implements OnInit {
  // Admin Base Data
  adminId: string;
  role: string;
  permissions: AdminPermissions[];

  // Store Data
  toggleMenu: boolean = false;
  reports: Report[] = [];
  holdPrevData: Report[] = [];
  reportCount = 0;
  id?: string;

  // Selected Data
  selectedIds: string[] = [];
  @ViewChild('matCheckbox') matCheckbox: MatCheckbox;

  // Date
  today = new Date();
  dataFormDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  // Search Area
  @ViewChild('searchForm') searchForm: NgForm;
  searchQuery = null;
  searchReport: Report[] = [];

  // Pagination
  currentPage = 1;
  totalReports = 0;
  ReportsPerPage = 5;
  totalReportsStore = 0;

  // FilterData
  filter: any = null;
  sortQuery: any = null;
  activeFilter1: number = null;
  activeFilter2: number = null;
  activeSort: number;
  number = [{num: '10'}, {num: '25'}, {num: '50'}, {num: '100'}];


  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subForm: Subscription;
  private subRouteOne: Subscription;

  constructor(
    private adminService: AdminService,
    private reportService: ReportService,
    private uiService: UiService,
    private utilsService: UtilsService,
    private router: Router,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private reloadService: ReloadService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.reloadService.refreshBrand$.subscribe(() => {
      this.getAllReport();
    });

    // GET PAGE FROM QUERY PARAM
    this.subRouteOne = this.activatedRoute.queryParamMap.subscribe((qParam) => {
      if (qParam && qParam.get('page')) {
        this.currentPage = Number(qParam.get('page'));
      } else {
        this.currentPage = 1;
      }
      this.getAllReport();
    });

    // Base Data
    this.getAdminBaseData();
  }

  ngAfterViewInit(): void {
    const formValue = this.searchForm.valueChanges;

    this.subForm = formValue
      .pipe(
        // map(t => t.searchTerm)
        // filter(() => this.searchForm.valid),
        pluck('searchTerm'),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((data) => {
          this.searchQuery = data;
          if (this.searchQuery === '' || this.searchQuery === null) {
            this.searchReport = [];
            this.reports = this.holdPrevData;
            this.totalReports = this.totalReportsStore;
            this.searchQuery = null;
            return EMPTY;
          }
          const pagination: Pagination = {
            pageSize: Number(this.ReportsPerPage),
            currentPage: Number(this.currentPage) - 1,
          };

          // Select
          const mSelect = {
            // image: 1,
            user: 1,
            product: 1,
            reportDate: 1,
            report: 1,
            rating: 1,
            status: 1,
          };

          const filterData: FilterData = {
            pagination: pagination,
            filter: this.filter,
            select: mSelect,
            sort: {createdAt: -1},
          };

          return this.reportService.getAllReport(filterData, this.searchQuery);
        })
      )
      .subscribe({
        next: (res) => {
          this.searchReport = res.data;
          this.reports = this.searchReport;
          this.totalReports = res.count;
          this.currentPage = 1;
          this.router.navigate([], {queryParams: {page: this.currentPage}});
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  /**
   * CHECK ADMIN PERMISSION
   * getAdminBaseData()
   * checkAddPermission()
   * checkDeletePermission()
   * checkEditPermission()
   */

  private getAdminBaseData() {
    this.adminId = this.adminService.getAdminId();
    this.role = this.adminService.getAdminRole();
    this.permissions = this.adminService.getAdminPermissions();
  }

  get checkAddPermission(): boolean {
    return this.permissions.includes(AdminPermissions.CREATE);
  }

  get checkDeletePermission(): boolean {
    return this.permissions.includes(AdminPermissions.DELETE);
  }

  get checkEditPermission(): boolean {
    return this.permissions.includes(AdminPermissions.EDIT);
  }


  /**
   *  Pagination
   * onPageChanged()
   */

  public onPageChanged(event: any) {
    this.router.navigate([], {queryParams: {page: event}});
  }


  /**
   * HTTP REQ HANDLE
   * getAllReport()
   * deleteMultipleReportById()
   */

  private getAllReport() {
    // Select
    const mSelect = {
      // image: 1,
      user: 1,
      product: 1,
      reportDate: 1,
      report: 1,
      rating: 1,
      status: 1,
    };

    const filter: FilterData = {
      filter: this.filter,
      pagination: null,
      select: mSelect,
      sort: {createdAt: -1},
    };

    this.subDataOne = this.reportService.getAllReport(filter, null).subscribe({
      next: (res) => {
        if (res.success) {
          this.reports = res.data;
          console.log("this.reports",this.reports)
          this.reportCount = res.count;
          this.holdPrevData = this.reports;
          this.totalReportsStore = this.reportCount;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  private deleteMultipleReportById() {
    this.spinner.show();
    this.subDataTwo = this.reportService
      .deleteMultipleReportById(this.selectedIds)
      .subscribe({
        next: (res => {
          this.spinner.hide();
          if (res.success) {
            // Get Data array
            const selectedReport = [];
            this.selectedIds.forEach((id) => {
              const fData = this.reports.find((data) => data._id === id);
              if (fData) {
                selectedReport.push(fData);
              }
            });
            this.selectedIds = [];
            this.uiService.success(res.message);
            // fetch Data
            if (this.currentPage > 1) {
              this.router.navigate([], {queryParams: {page: 1}});
            } else {
              this.getAllReport();
            }
          } else {
            this.uiService.warn(res.message);
          }
        }),
        error: (error => {
          this.spinner.hide();
          console.log(error);
        })
      });
  }


  /**
   * FILTER DATA & Sorting
   * onCheckChange()
   * onAllSelectChange()
   * endChangeRegDateRange()
   * onRemoveAllQuery()
   */

  onCheckChange(event: any, index: number, id: string) {
    if (event) {
      this.selectedIds.push(id);
    } else {
      const i = this.selectedIds.findIndex((f) => f === id);
      this.selectedIds.splice(i, 1);
    }
  }

  onAllSelectChange(event: MatCheckboxChange) {
    const currentPageIds = this.reports.map((m) => m._id);
    if (event.checked) {
      this.selectedIds = this.utilsService.mergeArrayString(
        this.selectedIds,
        currentPageIds
      );
      this.reports.forEach((m) => {
        m.select = true;
      });
    } else {
      currentPageIds.forEach((m) => {
        this.reports.find((f) => f._id === m).select = false;
        const i = this.selectedIds.findIndex((f) => f === m);
        this.selectedIds.splice(i, 1);
      });
    }
  }

  endChangeRegDateRange(event: MatDatepickerInputEvent<any>) {
    if (event.value) {
      const startDate = this.utilsService.getDateString(
        this.dataFormDateRange.value.start
      );
      const endDate = this.utilsService.getDateString(
        this.dataFormDateRange.value.end
      );

      const qData = {dateString: {$gte: startDate, $lte: endDate}};
      this.filter = {...this.filter, ...qData};
      // const index = this.filter.findIndex(x => x.hasOwnProperty('createdAt'));

      if (this.currentPage > 1) {
        this.router.navigate([], {queryParams: {page: 1}});
      } else {
        this.getAllReport();
      }
    }
  }

  onRemoveAllQuery() {
    this.activeSort = null;
    this.activeFilter1 = null;
    this.activeFilter2 = null;
    this.sortQuery = {createdAt: -1};
    this.filter = null;
    this.dataFormDateRange.reset();
    // Re fetch Data
    if (this.currentPage > 1) {
      this.router.navigate([], {queryParams: {page: 1}});
    } else {
      this.getAllReport();
    }
  }


  /**
   * COMPONENT DIALOG VIEW
   */
  public openConfirmDialog(type: string) {
    switch (type) {
      case 'delete': {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          maxWidth: '400px',
          data: {
            title: 'Confirm Delete',
            message: 'Are you sure you want delete this data?',
          },
        });
        dialogRef.afterClosed().subscribe((dialogResult) => {
          if (dialogResult) {
            this.deleteMultipleReportById();
          }
        });
        break;
      }
      default: {
        break;
      }
    }
  }


  /**
   *  Sorting
   * sortData()
   */

  sortData(query: any, type: number) {
    this.sortQuery = query;
    this.activeSort = type;
    this.getAllReport();
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
    if (this.subForm) {
      this.subForm.unsubscribe();
    }

    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
  }

}
