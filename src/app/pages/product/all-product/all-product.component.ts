import {Component, OnInit, ViewChild} from '@angular/core';
import {UiService} from '../../../services/core/ui.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ReloadService} from '../../../services/core/reload.service';
import {EMPTY, Subscription} from 'rxjs';
import {FilterData} from '../../../interfaces/gallery/filter-data';
import {Product} from '../../../interfaces/common/product.interface';
import {ProductService} from '../../../services/common/product.service';
import {AdminPermissions} from 'src/app/enum/admin-permission.enum';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {UtilsService} from '../../../services/core/utils.service';
import {debounceTime, distinctUntilChanged, pluck, switchMap,} from 'rxjs/operators';
import {Pagination} from '../../../interfaces/core/pagination';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as XLSX from 'xlsx';
import {MatDialog} from '@angular/material/dialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {ConfirmDialogComponent} from '../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import {FileUploadService} from '../../../services/gallery/file-upload.service';
import {Category} from "../../../interfaces/common/category.interface";
import {Brand} from "../../../interfaces/common/brand.interface";
import {CategoryService} from "../../../services/common/category.service";
import {Publisher} from "../../../interfaces/common/publisher.interface";
import {PublisherService} from "../../../services/common/publisher.service";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss'],
})
export class AllProductComponent implements OnInit {
  // Admin Base Data
  adminId: string;
  role: string;
  permissions: AdminPermissions[];

  // Store Data
  toggleMenu: boolean = false;
  products: Product[] = [];
  holdPrevData: Product[] = [];
  categories: Category[]=[];
  brands:Brand[]=[];
  publishers: Publisher[]=[];
  productCount = 0;
  id?: string;

  // Pagination
  currentPage = 1;
  totalProducts = 0;
  productsPerPage = 100;
  totalProductsStore = 0;

  // FilterData
  filter: any = null;
  sortQuery: any = null;
  activeFilterIndex: number = null;
  activeSort: number;
  number = [{num: '10'}, {num: '25'}, {num: '50'}, {num: '100'}];

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
  searchProduct: Product[] = [];

  // Subscriptions
  private subAllProduct: Subscription;
  private subAllPublisher: Subscription;
  private subAllCategory: Subscription;
  private subDeleteProduct: Subscription;
  private subUpdateProduct: Subscription;
  private subForm: Subscription;
  private subRouteOne: Subscription;
  private subReload: Subscription;

  constructor(
    private productService: ProductService,
    private uiService: UiService,
    private utilsService: UtilsService,
    private router: Router,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private reloadService: ReloadService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private publisherService: PublisherService,
  ) {
  }

  ngOnInit(): void {
    // Reload
   this.subReload = this.reloadService.refreshData$.subscribe(() => {
      this.getAllProduct();
    });

    // GET PAGE FROM QUERY PARAM
    this.subRouteOne = this.activatedRoute.queryParamMap.subscribe((qParam) => {
      if (qParam && qParam.get('page')) {
        this.currentPage = Number(qParam.get('page'));
      } else {
        this.currentPage = 1;
      }
      this.getAllProduct();
    });
    this.getAllCategory();
    this.getAllPublisher();
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
            this.searchProduct = [];
            this.products = this.holdPrevData;
            this.totalProducts = this.totalProductsStore;
            this.searchQuery = null;
            return EMPTY;
          }
          const pagination: Pagination = {
            pageSize: Number(this.productsPerPage),
            currentPage: Number(this.currentPage) - 1,
          };

          // Select
          const mSelect = {
            image: 1,
            name: 1,
            images: 1,
            createdAt: 1,
            publisher: 1,
            brand: 1,
            costPrice: 1,
            salePrice: 1,
            discountType: 1,
            discountAmount: 1,
            quantity: 1,
            category: 1,
            subCategory: 1,
            unit: 1,
            status: 1,
            threeMonth: 1,
            sixMonth: 1,
            twelveMonth: 1,
            isFeatured: 1,
          };

          const filterData: FilterData = {
            pagination: pagination,
            filter: this.filter,
            select: mSelect,
            sort: {createdAt: -1},
          };

          return this.productService.getAllProducts(
            filterData,
            this.searchQuery
          );
        })
      )
      .subscribe({
        next: (res) => {
          this.searchProduct = res.data;
          this.products = this.searchProduct;
          this.totalProducts = res.count;
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
   * onSelectShowPerPage()
   * checkAddPermission()
   * checkEditPermission()
   * checkDeletePermission()
   */
  onSelectShowPerPage(val) {
    this.productsPerPage = val;
    this.getAllProduct();
  }

  checkAddPermission(): boolean {
    return this.permissions.includes(AdminPermissions.CREATE);
  }

  checkEditPermission(): boolean {
    return this.permissions.includes(AdminPermissions.EDIT);
  }

  checkDeletePermission(): boolean {
    return this.permissions.includes(AdminPermissions.DELETE);
  }

  /**
   * UI Essentials
   * onToggle()
   */

  onToggle() {
    console.log('Click');
    this.toggleMenu = !this.toggleMenu;
  }

  /**
   * HTTP REQ HANDLE
   * getAllProduct()
   * deleteMultipleProductById()
   * deleteMultipleFile()
   */

  private getAllProduct() {
    // Select
    const mSelect = {
      image: 1,
      name: 1,
      title: 1,
      images: 1,
      user:1,
      createdAt: 1,
      category: 1,
      isFeatured: 1,
      isRegion: 1,
      division: 1
    };

    const filter: FilterData = {
      filter: this.filter,
      pagination: {pageSize: this.productsPerPage, currentPage: this.currentPage - 1},
      select: mSelect,
      sort: {createdAt: -1},
    };
    this.spinner.show();
    this.subAllProduct = this.productService
      .getAllProducts(filter, null)
      .subscribe({
        next: (res) => {
          this.spinner.hide();
          if (res.success) {
            this.products = res.data;
            console.log("this.products",this.products);
            this.productCount = res.count;
            this.holdPrevData = this.products;
            this.totalProductsStore = this.productCount;
          }
        },
        error: (err) => {
          this.spinner.hide();
          console.log(err);
        },
      });
  }

  private getAllPublisher() {
    // Select
    const mSelect = {
      image: 1,
      name: 1,
      createdAt: 1,
    };

    const filter: FilterData = {
      filter: this.filter,
      pagination: null,
      select: mSelect,
      sort: {createdAt: -1},
    };
    
    this.subAllPublisher = this.publisherService
      .getAllPublisher(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.publishers = res.data;
            console.log("publishers",this.publishers)
          }
        },
        error: (err) => {
        console.log(err);
        },
      });
  }

  private getAllCategory() {
    // Select
    const mSelect = {
      name: 1,
      image: 1,
      mobileImage: 1,
      createdAt: 1,
      serial: 1,
      status: 1,
    };

    const filter: FilterData = {
      filter: this.filter,
      pagination: null,
      select: mSelect,
      sort: {createdAt: -1},
    };

    this.subAllCategory = this.categoryService
      .getAllCategory(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.categories = res.data;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private deleteMultipleProductById() {
    this.spinner.show();
    this.subDeleteProduct = this.productService
      .deleteMultipleProductById(this.selectedIds)
      .subscribe(
        (res) => {
          this.spinner.hide();
          if (res.success) {
            // Get Data array
            const selectedProduct = [];
            this.selectedIds.forEach((id) => {
              const fData = this.products.find((data) => data._id === id);
              if (fData) {
                selectedProduct.push(fData);
              }
            });
            this.selectedIds = [];
            this.uiService.success(res.message);
            // fetch Data
            if (this.currentPage > 1) {
              this.router.navigate([], {queryParams: {page: 1}});
            } else {
              this.getAllProduct();
            }
          } else {
            this.uiService.warn(res.message);
          }
        },
        (error) => {
          this.spinner.hide();
          console.log(error);
        }
      );
  }


  private updateMultipleProductById(data: any) {
    this.spinner.show();
    this.subUpdateProduct = this.productService
      .updateMultipleProductById(this.selectedIds, data)
      .subscribe(
        (res) => {
          this.spinner.hide();
          if (res.success) {
            // Get Data array
            this.selectedIds = [];
            this.uiService.success(res.message);
            // fetch Data
            this.reloadService.needRefreshData$();
          } else {
            this.uiService.warn(res.message);
          }
        },
        (error) => {
          this.spinner.hide();
          console.log(error);
        }
      );
  }


  /**
   * FILTER DATA & Sorting
   * filterData()
   * endChangeRegDateRange()
   * sortData()
   * onPageChanged()
   */

  filterData(value: any, index: number, type: string) {
    switch (type) {
      case 'category': {
        this.filter = { ...this.filter, ...{ 'category._id': value} };
        this.activeFilterIndex = index;
        break;
      }
      default: {
        break;
      }
    }
    // Re fetch Data
    if (this.currentPage > 1) {
      this.router.navigate([], {queryParams: {page: 1}});
    } else {
      this.getAllProduct();
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
        this.getAllProduct();
      }
    }
  }

  sortData(query: any, type: number) {
    this.sortQuery = query;
    this.activeSort = type;
    this.getAllProduct();
  }

  public onPageChanged(event: any) {
    this.router.navigate([], {queryParams: {page: event}});
  }

  /**
   * ON Select Check
   * onCheckChange()
   * onAllSelectChange()
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
    const currentPageIds = this.products.map((m) => m._id);
    if (event.checked) {
      this.selectedIds = this.utilsService.mergeArrayString(
        this.selectedIds,
        currentPageIds
      );
      this.products.forEach((m) => {
        m.select = true;
      });
    } else {
      currentPageIds.forEach((m) => {
        this.products.find((f) => f._id === m).select = false;
        const i = this.selectedIds.findIndex((f) => f === m);
        this.selectedIds.splice(i, 1);
      });
    }
  }

  /**
   * EXPORTS TO EXCEL
   * exportToExcel()
   */

  exportToAllExcel() {
    console.log('dfd');
    const date = this.utilsService.getDateString(new Date());

    // Select
    const mSelect = {
      image: 1,
      name: 1,
      title: 1,
      images: 1,
      createdAt: 1,
      category: 1,
      isFeatured: 1,
      division: 1
    };

    const filterData: FilterData = {
      filter: null,
      select: mSelect,
      sort: this.sortQuery,
    };

    this.subAllProduct = this.productService
      .getAllProducts(filterData, this.searchQuery)
      .subscribe({
        next: (res) => {
          const subscriptionReports = res.data;

          const mData = subscriptionReports.map((m) => {
            return {
              // image: m?.image,
              name: m?.name,
              createdAt: this.utilsService.getDateString(m.createdAt),
            };
          });

          // console.warn(mData)
          // EXPORT XLSX
          const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(mData);
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Data');
          XLSX.writeFile(wb, `Product Reports_${date}.xlsx`);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  /**
   * COMPONENT DIALOG VIEW
   * openConfirmDialog()
   */
  public openConfirmDialog(type: 'edit' | 'delete', data: any) {
    switch (type) {
      case 'edit': {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          maxWidth: '400px',
          data: {
            title: 'Confirm Edit',
            message: 'Are you sure you want edit this data?',
          },
        });
        dialogRef.afterClosed().subscribe((dialogResult) => {
          if (dialogResult) {
            this.updateMultipleProductById(data);
          }
        });
        break;
      }

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
            this.deleteMultipleProductById();
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
   * ON REMOVE ALL QUERY
   * onRemoveAllQuery()
   */

  onRemoveAllQuery() {
    this.activeSort = null;
    this.activeFilterIndex = null;
    this.sortQuery = {createdAt: -1};
    this.filter = null;
    this.dataFormDateRange.reset();
    // Re fetch Data
    if (this.currentPage > 1) {
      this.router.navigate([], {queryParams: {page: 1}});
    } else {
      this.getAllProduct();
    }
  }
 
  /**
    * On View Button Click
  */

  public openExternalUrl(productId:string): void {
    const url = `https://${environment.domain}/ad-details/${productId}`;
    const newTab = window.open(url, '_blank');
    if (newTab) {
      newTab.focus();
    } else {
      this.uiService.warn('Unable to open new tab. Please check your browser settings.');
    }
  }

  /**
   * ON DESTROY
   */

  ngOnDestroy() {
    if (this.subAllProduct) {
      this.subAllProduct.unsubscribe();
    }

    if (this.subAllPublisher) {
      this.subAllPublisher.unsubscribe();
    }

    if (this.subAllCategory) {
      this.subAllCategory.unsubscribe();
    }

    if (this.subDeleteProduct) {
      this.subDeleteProduct.unsubscribe();
    }
    if (this.subUpdateProduct) {
      this.subUpdateProduct.unsubscribe();
    }

    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }

    if (this.subForm) {
      this.subForm.unsubscribe();
    }
    if (this.subReload) {
      this.subReload.unsubscribe();
    }
  }
}
