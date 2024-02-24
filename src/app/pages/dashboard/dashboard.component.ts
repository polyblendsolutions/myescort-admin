import {Component, OnDestroy, OnInit} from '@angular/core';
import {SaleDashboard} from '../../interfaces/common/dashboard.interface';
import {DashboardService} from '../../services/common/dashboard.service';
import {Subscription} from 'rxjs';
import {AdminService} from 'src/app/services/admin/admin.service';
import {FilterData} from "../../interfaces/gallery/filter-data";
import {UsersService} from "../../services/common/users.service";
import {Users} from "../../interfaces/common/users.interface";
import {NgxSpinnerService} from "ngx-spinner";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  USER_ROLE: any;
  saleDashboard: SaleDashboard = null;

  // Pagination
  currentPage = 1;
  totalUnit = 0;
  UsersPerPage = 5;
  totalUsersStore = 0;
  users: Users[] = [];
  holdPrevData: Users[] = [];
  usersCount = 0;
  // FilterData
  filter: any = null;
  // Subscriptions
  private subDataOne: Subscription;

  constructor(
    private dashboardService: DashboardService,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private usersService: UsersService,
  ) {
  }

  ngOnInit(): void {
    this.USER_ROLE = this.adminService.getAdminRole();
    this.getSalesDashboard();
    this.getAllUserss();
  }


  /**
   * HTTP REQ HANDLE
   * getUserDashboard()
   */
  getSalesDashboard() {
    this.subDataOne = this.dashboardService.getSalesDashboard()
      .subscribe({
        next: (res) => {
          this.saleDashboard = res.data;
          console.log("this.saleDashboard", this.saleDashboard);
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

  private getAllUserss() {
    // Spinner..
    this.spinner.show();
    const filter: FilterData = {
      filter: this.filter,
      pagination: null,
      select: {
        name: 1,
        phone: 1,
        email: 1,
        image: 1,
        profileImg: 1,
        createdAt: 1,
      },
      sort: {createdAt: -1},
    };

    this.subDataOne = this.usersService.getAllUsers(filter, null).subscribe({
      next: (res) => {
        if (res.success) {
          this.users = res.data;
          this.usersCount = res.count;
          this.holdPrevData = this.users;
          this.totalUsersStore = this.usersCount;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  /**
   * NG ON DESTROY
   */
  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }


}
