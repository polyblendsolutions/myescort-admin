import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {HairColor} from "../../../interfaces/common/hairColor.interface";
import {EMPTY, filter, ReplaySubject, Subject, takeUntil, tap} from "rxjs";
import {MatSelectSearchComponent} from "ngx-mat-select-search";
import {HairColorService} from "../../../services/common/hairColor.service";
import {UtilsService} from "../../../services/core/utils.service";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {Pagination} from "../../../interfaces/core/pagination";
import {FilterData} from "../../../interfaces/gallery/filter-data";

@Component({
  selector: 'app-hair-select',
  templateUrl: './hair-select.component.html',
  styleUrls: ['./hair-select.component.scss']
})
export class HairSelectComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  // Dynamic Component Data
  @Input('controlName') controlName: FormControl;
  @Input('required') required: boolean = false;
  @Input('placeholder') placeholder: string = 'Select';
  @Input('data') data: HairColor;

  // Store Data
  public dataList: HairColor[] = [];
  public filteredDataList: ReplaySubject<HairColor[]> = new ReplaySubject<HairColor[]>(1);
  searchDataList: HairColor[] = [];

  // Form Control
  public selectCtrl: FormControl;

  // Search Control
  public searchCtrl: FormControl = new FormControl();

  // Search Progress
  public searching = false;

  // Pagination
  currentPage = 1;
  dataPerPage = 100;
  totalData = 0;

  // Destroy
  protected _onDestroy = new Subject<void>();

  @ViewChild('matSearchSelect') matSearchSelect: MatSelectSearchComponent;

  constructor(
    private hairColorService: HairColorService,
    private utilsService: UtilsService,
  ) { }

  ngOnInit(): void {
    if (this.controlName) {
      this.selectCtrl = this.controlName;
    } else {
      this.selectCtrl = new FormControl();
    }
    // Default Data
    this.getAllHairColorList();
  }



  ngOnChanges() {
    if (this.data) {
      this.dataList.push(this.data);
      this.selectCtrl.setValue(this.data);
    }
  }


  /**
   * MAIN SEARCH
   */
  ngAfterViewInit() {
    this.searchCtrl.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searching = true),
        takeUntil(this._onDestroy),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(search => {
          if (!this.searchCtrl.value.trim()) {
            this.searching = false;
            if (this.selectCtrl.value) {
              const singleArray = [this.selectCtrl.value];
              const allHairColors = [...this.searchDataList, ...this.dataList]
              const selectedData = allHairColors.filter(m => {
                return singleArray.some(n => n === m._id)
              });
              const uniqueData = this.utilsService.margeMultipleArrayUnique('_id', selectedData, selectedData);
              this.filteredDataList.next([...uniqueData, ...this.dataList]);
              return EMPTY;
            } else {
              this.filteredDataList.next([...this.dataList]);
              return EMPTY;
            }

          }

          const pagination: Pagination = {
            pageSize: 10,
            currentPage: 0,
          };

          // Select
          const mSelect = {
            name: 1,
            slug: 1,
          };

          const filterData: FilterData = {
            pagination: pagination,
            filter: null,
            select: mSelect,
            sort: { createdAt: -1 },
          };

          return this.hairColorService.getAllHairColor(filterData, search);
        })
      )
      .subscribe({
        next: res => {
          this.searching = false;
          this.searchDataList = [...this.searchDataList, ...res.data];
          this.filteredDataList.next(res.data);
        },
        error: error => {
          this.searching = false;
          console.log(error)
        }

      })
  }

  /**
   * GET NEXT DATA
   */
  getNextTestBatch() {
    if (this.searchCtrl.value) {
      return;
    }
    this.currentPage += 1;
    this.getAllHairColorList();
  }

  /**
   * HTTP REQ HANDLE
   * getAllHairColorList()
   */

  private getAllHairColorList() {

    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    };


    const pagination: Pagination = {
      pageSize: this.dataPerPage,
      currentPage: this.currentPage - 1
    };

    const filter: FilterData = {
      filter: null,
      pagination: pagination,
      select: mSelect,
      sort: { createdAt: -1 },
    };



    this.hairColorService.getAllHairColor(filter, null)
      .subscribe({
        next: res => {
          this.totalData = res.count;
          if (this.selectCtrl.value) {
            const singleArray = [this.selectCtrl.value];
            const allHairColors = [...this.searchDataList, ...this.dataList]
            const selectedData = allHairColors.filter(m => {
              return singleArray.some(n => n === m._id)
            });
            const uniqueData = this.utilsService.margeMultipleArrayUnique('_id', selectedData, selectedData);
            this.dataList = [...this.dataList, ...res.data];
            this.filteredDataList.next([...uniqueData, ...this.dataList, ...res.data]);
          } else {
            this.dataList = [...this.dataList, ...res.data];
            this.filteredDataList.next(this.dataList);
          }
        },
        error: error => {
          console.log(error);
        }
      })
  }

  /**
   * ON CLEAR SEARCH
   * ON CLOSE PANEL
   */
  onClear() {
    this.searchCtrl.reset();
    this.getDefaultDataArray();
  }

  /**
   * DEFAULT COMPLEX DATA FOR SELECT TRACK
   */
  private getDefaultDataArray() {
    if (this.selectCtrl.value) {
      const singleArray = [this.selectCtrl.value];
      const allHairColors = [...this.searchDataList, ...this.dataList]
      const selectedData = allHairColors.filter(m => {
        return singleArray.some(n => n._id === m._id)
      });
      const uniqueData = this.utilsService.margeMultipleArrayUnique('_id', selectedData, selectedData);
      this.filteredDataList.next([...uniqueData, ...this.dataList]);
      this.selectCtrl.patchValue(uniqueData[0]);
    } else {
      this.filteredDataList.next([...this.dataList]);
    }
  }

  /**
   * ON DESTROY
   */
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


}
