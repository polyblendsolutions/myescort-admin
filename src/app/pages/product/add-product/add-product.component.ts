import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators,} from '@angular/forms';
import {Select} from '../../../interfaces/core/select';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {UiService} from '../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ProductService} from '../../../services/common/product.service';
import {UtilsService} from '../../../services/core/utils.service';
import {Product} from '../../../interfaces/common/product.interface';
import {DISCOUNT_TYPES, EMI_MONTHS, PRODUCT_STATUS,} from '../../../core/utils/app-data';
import {FilterData} from '../../../interfaces/core/filter-data';
import {Tag} from '../../../interfaces/common/tag.interface';
import {TagService} from '../../../services/common/tag.service';
import {FileUploadService} from 'src/app/services/gallery/file-upload.service';
import {Category} from 'src/app/interfaces/common/category.interface';
import {MatDialog} from '@angular/material/dialog';
import {AllImagesDialogComponent} from '../../gallery/images/all-images-dialog/all-images-dialog.component';
import {Gallery} from '../../../interfaces/gallery/gallery.interface';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ThemePalette} from "@angular/material/core";
import {ZoneService} from "../../../services/common/zone.service";
import {AreaService} from "../../../services/common/area.service";
import {DivisionService} from "../../../services/common/division.service";
import {Area} from "../../../interfaces/common/area.interface";
import {Division} from "../../../interfaces/common/division.interface";
// export interface Task {
//   name: string;
//   completed: boolean;
//   color: ThemePalette;
//   subtasks?: Task[];
// }
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  // task: Task = {
  //   name: 'Active opening hours',
  //   completed: false,
  //   color: 'primary',
  //   subtasks: [
  //     {name: 'Monday', completed: false, color: 'primary'},
  //     {name: 'Tuesday', completed: false, color: 'accent'},
  //     {name: 'Wednesday', completed: false, color: 'warn'},
  //     {name: 'Thursday', completed: false, color: 'warn'},
  //     {name: 'Friday', completed: false, color: 'warn'},
  //     {name: 'Saturday', completed: false, color: 'warn'},
  //     {name: 'Sunday', completed: false, color: 'warn'},
  //   ],
  // };

  // all Days
  allDays: Select[] = [
    {value: 'Monday', viewValue: 'Monday'},
    {value: 'Tuesday', viewValue: 'Tuesday'},
    {value: 'Wednesday', viewValue: 'Wednesday'},
    {value: 'Thursday', viewValue: 'Thursday'},
    {value: 'Friday', viewValue: 'Friday'},
    {value: 'Saturday', viewValue: 'Saturday'},
    {value: 'Sunday', viewValue: 'Sunday'},
  ]
  // Ngx Quill
  modules: any = null;
  allComplete: boolean = false;

  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;
  divisions: Division[] = [];
  area: Area[] = [];
  zone?: any;
  // Form Array
  specificationDataArray?: FormArray;
  featuresDataArray?: FormArray;
  daysDataArray?: FormArray;
  mondayHoursArray?: FormArray;
  tuesdayHoursArray?: FormArray;

  wednesdayHoursArray?: FormArray;
  thursdayHoursArray?: FormArray;

  fridayHoursArray?: FormArray;
  saturdayHoursArray?: FormArray;
  // Infinity Select
  categoryCtrl: FormControl = new FormControl();
  subCategoryCtrl: FormControl = new FormControl();
  // authorCtrl: FormControl = new FormControl();
  brandCtrl: FormControl = new FormControl();
  // publisherCtrl: FormControl = new FormControl();
  typeCtrl: FormControl = new FormControl();
  intimateHairCtrl: FormControl = new FormControl();
  hairColorCtrl: FormControl = new FormControl();
  orientationCtrl: FormControl = new FormControl();
  regionCtrl: FormControl = new FormControl();

  // Store Data
  tags: Tag[] = [];
  allDay: any[] = [];
  id?: string;
  product?: Product;
  selectedCategory: Category = null;

  // Image
  files: File[] = [];
  pickedImage: any[] = [];
  oldImages: string[] = [];
  removeImages: string[] = [];
  chooseImage?: string[] = [];
  dayHoursArray?: FormArray;
  // Static Data
  productStatus: Select[] = PRODUCT_STATUS;
  emiMonths: Select[] = EMI_MONTHS;
  discountTypes: Select[] = DISCOUNT_TYPES;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subDataSix: Subscription;
  private subRouteOne: Subscription;
  private subDivisionData: Subscription;
  private subAreaData: Subscription;
  private subZoneData: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private tagService: TagService,
    private fileUploadService: FileUploadService,
    private dialog: MatDialog,
    private utilsService: UtilsService,
    private divisionService: DivisionService,
    private areaService: AreaService,
    private zoneService: ZoneService,
  ) {
  }

  ngOnInit(): void {
    // Init Data Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getProductById();
      }
    });
    this.getAllDivision();
    // Base Data
    this.getAllTags();
  }

  /**
   * FORMS METHODS
   * initDataForm()
   * setFormValue()
   * onAddNewSpecifications()
   * removeFormArrayField()
   * clearFormArray()
   * findInvalidControls()
   * onSubmit()
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null],
      slug: [null],
      description: [null],
      shortDescription: [null],
      pricing: [null],
      verified: [null],
      featureTitle: [null],
      costPrice: [null],
      salePrice: [null],
      hasTax: [null],
      tax: [null],
      cartLimit: [null],
      sku: [null],
      emiMonth: [null],
      discountType: [null],
      discountAmount: [null],
      images: [null],
      quantity: [null],
      trackQuantity: [null],
      seoTitle: [null],
      seoDescription: [null],
      seoKeywords: [null],
      category: this.categoryCtrl,
      subCategory: this.subCategoryCtrl,
      // publisher: this.publisherCtrl,
      type: this.typeCtrl,
      intimateHair: this.intimateHairCtrl,
      hairColor: this.hairColorCtrl,
      orientation: this.orientationCtrl,
      region: this.regionCtrl,
      // author: this.authorCtrl,
      brand: this.brandCtrl,
      tags: [null],
      openingHours: [null],
      division: [null],
      zone: [null],
      area: [null],
      title: [null],
      age: [null],
      height: [null],
      weight: [null],
      runningOut: [null],
      acceptsPeople: [null],
      size: [null],
      specialHours: [null],
      zipCode: [null],
      address: [null],
      phone: [null],
      whatsapp: [null],
      email: [null],
      homePage: [null],
      earnPoint: [null],
      pointType: [null],
      pointValue: [null],
      threeMonth: [null],
      sixMonth: [null],
      emiAmount: [null],
      twelveMonth: [null],
      redeemPoint: [null],
      redeemType: [null],
      redeemValue: [null],
      status: [this.productStatus[1].value, Validators.required],
      videoUrl: [null],
      unit: [null],
      specifications: this.fb.array([]),
      features: this.fb.array([]),
      // Variations
      hasVariations: [null],
      // days: this.buildDaysCheckArray(),
      dayHours: this.fb.array([]),

      mondayHours: this.fb.array([]),
      tuesdayHours: this.fb.array([]),
      wednesdayHours: this.fb.array([]),
      thursdayHours: this.fb.array([]),
      fridayHours: this.fb.array([]),
      saturdayHours: this.fb.array([]),
      monday: [null],
      mondaySlot: [null],
      tuesday: [null],
      tuesdaySlot: [null],
      wednesday: [null],
      wednesdaySlot: [null],
      thursday: [null],
      thursdaySlot: [null],
      friday: [null],
      fridaySlot: [null],
      saturday: [null],
      saturdaySlot: [null],

    });
    // this.specificationDataArray = this.dataForm.get(
    //   'specifications'
    // ) as FormArray;
    // this.featuresDataArray = this.dataForm.get(
    //   'features'
    // ) as FormArray;

    // this.daysDataArray = this.dataForm.get(
    //   'days'
    // ) as FormArray;
    this.dayHoursArray = this.dataForm.get('dayHours') as FormArray;

    this.mondayHoursArray = this.dataForm.get('mondayHours') as FormArray;
    this.tuesdayHoursArray = this.dataForm.get('tuesdayHours') as FormArray;
    this.wednesdayHoursArray = this.dataForm.get('wednesdayHours') as FormArray;
    this.thursdayHoursArray = this.dataForm.get('thursdayHours') as FormArray;
    this.fridayHoursArray = this.dataForm.get('fridayHours') as FormArray;
    this.saturdayHoursArray = this.dataForm.get('saturdayHours') as FormArray;

    this.onAddNewFormArrayObject('mondayHours');
    this.onAddNewFormArrayObject('tuesdayHours');
    this.onAddNewFormArrayObject('wednesdayHours');
    this.onAddNewFormArrayObject('thursdayHours');
    this.onAddNewFormArrayObject('fridayHours');
    this.onAddNewFormArrayObject('saturdayHours');
  }



  // Form Array
  onAddNewFormArrayObject(formControl: string) {
    const f = this.fb.group({
      day: [null],
      startHour: [null],
      endHour: [null],
    });
    (this.dataForm?.get(formControl) as FormArray).push(f);
  }

  removeFormArrayField(formControl: string, index: number) {
    let formDataArray: FormArray;
    switch (formControl) {
      case 'mondayHours': {
        formDataArray = this.mondayHoursArray;
        break;
      }
      case 'tuesdayHours': {
        formDataArray = this.tuesdayHoursArray;
        break;
      }
      case 'wednesdayHours': {
        formDataArray = this.wednesdayHoursArray;
        break;
      }
      case 'thursdayHours': {
        formDataArray = this.thursdayHoursArray;
        break;
      }
      case 'fridayHours': {
        formDataArray = this.fridayHoursArray;
        break;
      }
      case 'saturdayHours': {
        formDataArray = this.saturdayHoursArray;
        break;
      }
      default: {
        formDataArray = null;
        break;
      }
    }
    formDataArray?.removeAt(index);
  }

  private setFormValue() {
    this.dataForm.patchValue(this.product);
    this.dataForm.patchValue({division: this.product?.division?._id});
    this.dataForm.patchValue({area: this.product?.area?._id});
    this.dataForm.patchValue({zone: this.product?.zone?._id});
    this.getAllArea(this.dataForm.get('division')?.value);
    this.getAllZone(this.dataForm.get('area')?.value);
    // Set Image
    if (this.product.images && this.product.images.length) {
      this.chooseImage = this.product.images;
    }

    // Tags
    if (this.product.tags && this.product.tags.length) {
      this.dataForm.patchValue({
        tags: this.product.tags.map((m) => m._id)
      });
    }
    // // allDay
    // if (this.allDays && this.allDays.length) {
    //   this.dataForm.patchValue({
    //     allDays: this.allDays.map((m) => m._id)
    //   });
    // }

    // Form Array Specifications
    if (this.product.specifications && this.product.specifications.length) {
      this.product.specifications.map((m) => {
        const f = this.fb.group({
          name: [m.name],
          value: [m.value],
          type: [m.type],
        });
        (this.dataForm?.get('specifications') as FormArray).push(f);
      });
    }
    // Form Array
    this.product.dayHours.map(m => {
      const f = this.fb.group({
        day: [m.day, Validators.required],
        startHour: [m.startHour, Validators.required],
        endHour: [m.endHour, Validators.required],
      });
      (this.dataForm?.get('dayHours') as FormArray).push(f);
    });

    // Form Array Features
    if (this.product.features && this.product.features.length) {
      this.product.features.map((m) => {
        const f = this.fb.group({
          name: [m.name],
          value: [m.value],
        });
        (this.dataForm?.get('features') as FormArray).push(f);
      });
    }

  }

  // // Form Array
  // onAddNewFormArrayObject(formControl: string) {
  //   const f = this.fb.group({
  //     day: [null, Validators.required],
  //     startHour: [null, Validators.required],
  //     endHour: [null, Validators.required],
  //   });
  //   (this.dataForm?.get(formControl) as FormArray).push(f);
  // }
  //
  // removeFormArrayField(formControl: string, index: number) {
  //   let formDataArray: FormArray;
  //   switch (formControl) {
  //     case 'dayHours': {
  //       formDataArray = this.dayHoursArray;
  //       break;
  //     }
  //     default: {
  //       formDataArray = null;
  //       break;
  //     }
  //   }
  //   formDataArray?.removeAt(index);
  // }
  // buildDaysCheckArray() {
  //   const arr = this.allDays.map(day => {
  //     return this.fb.control(day.checked);
  //   });
  //   return this.fb.array(arr);
  // }

  // get days() {
  //   return this.dataForm.get('days');
  // };

  onAddNewSpecifications() {
    const f = this.fb.group({
      name: [null],
      value: [null],
      type: [this.dataForm.value.specifications.length ? this.dataForm.value.specifications[this.dataForm.value.specifications.length - 1].type : null, Validators.required],
    });
    (this.dataForm?.get('specifications') as FormArray).push(f);
  }

  onAddNewFeatures() {
    const f = this.fb.group({
      name: [null],
      value: [null],
    });
    (this.dataForm?.get('features') as FormArray).push(f);
  }

  // removeFormArrayField(formControl: string, index: number) {
  //   let formDataArray: FormArray;
  //   switch (formControl) {
  //     case 'specifications': {
  //       formDataArray = this.specificationDataArray;
  //       break;
  //     }
  //
  //     default: {
  //       formDataArray = null;
  //       break;
  //     }
  //   }
  //   formDataArray?.removeAt(index);
  // }

  removeFeaturesFormArrayField(formControl: string, index: number) {
    let formDataArray: FormArray;
    switch (formControl) {
      case 'features': {
        formDataArray = this.featuresDataArray;
        break;
      }

      default: {
        formDataArray = null;
        break;
      }
    }
    formDataArray?.removeAt(index);
  }


  private getAllDivision() {
    let mSelect = {
      name: 1,
      slug: 1,
    }
    const filter: FilterData = {
      filter: {status: 'publish'},
      select: mSelect,
      pagination: null,
      sort: {createdAt: -1}
    }

    this.subDivisionData = this.divisionService.getAllDivisions(filter).subscribe(
      (res) => {
        if (res.success) {
          this.divisions = res.data;
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }

  private getAllArea(id: string) {
    const select = 'name slug';
    this.subAreaData = this.areaService.getAreaByParentId(id, select).subscribe(
      (res) => {
        if (res.success) {
          this.area = res.data;
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }


  private getAllZone(id: string) {
    const select = 'name slug';
    this.subZoneData = this.zoneService.getZoneByParentId(id, select).subscribe(
      (res) => {
        if (res.success) {
          this.zone = res.data;
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }


  /***
   * ON SELECT CHANGE
   * onChangeRegion()
   * onChangeArea()
   */
  onChangeRegion(event: any) {
    if (event) {
      this.getAllArea(this.dataForm.get('division')?.value);
    }
  }

  onChangeArea(event: any) {
    if (event) {
      this.getAllZone(this.dataForm.get('area')?.value);
    }
  }


  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }
    let selectDivision = this.divisions.find((d) => d._id === this.dataForm.value.division);
    let selectArea = this.area.find((d) => d._id === this.dataForm.value.area);
    let selectZone = this.zone.find((d) => d._id === this.dataForm.value.zone);
    const mData = {
      ...this.dataForm.value,
      ...{division: selectDivision},
      ...{area: selectArea},
      ...{zone: selectZone},
      ...{
        category: {
          _id: this.dataForm.value.category._id,
          name: this.dataForm.value.category.name,
          slug: this.dataForm.value.category.slug,
        },
        cartLimit: this.dataForm.value.cartLimit
          ? this.dataForm.value.cartLimit
          : 0,
      },
    };

    // Sub Category
    if (this.dataForm.value.subCategory) {
      mData.subCategory = {
        _id: this.dataForm.value.subCategory._id,
        name: this.dataForm.value.subCategory.name,
        slug: this.dataForm.value.subCategory.slug,
      };
    }

    // // Author
    // if (this.dataForm.value.author) {
    //   mData.author = {
    //     _id: this.dataForm.value.author._id,
    //     name: this.dataForm.value.author.name,
    //     slug: this.dataForm.value.author.slug,
    //   };
    // }
    //
    // // Publisher
    // if (this.dataForm.value.publisher) {
    //   mData.publisher = {
    //     _id: this.dataForm.value.publisher._id,
    //     name: this.dataForm.value.publisher.name,
    //     slug: this.dataForm.value.publisher.slug,
    //   };
    // }


    // type
    if (this.dataForm.value.type) {
      mData.type = {
        _id: this.dataForm.value.type._id,
        name: this.dataForm.value.type.name,
        slug: this.dataForm.value.type.slug,
      };
    }


 // intimateHair
    if (this.dataForm.value.intimateHair) {
      mData.type = {
        _id: this.dataForm.value.intimateHair._id,
        name: this.dataForm.value.intimateHair.name,
        slug: this.dataForm.value.intimateHair.slug,
      };
    }
    // hairColor
    if (this.dataForm.value.hairColor) {
      mData.type = {
        _id: this.dataForm.value.hairColor._id,
        name: this.dataForm.value.hairColor.name,
        slug: this.dataForm.value.hairColor.slug,
      };
    }

    // hairColor
    if (this.dataForm.value.orientation) {
      mData.type = {
        _id: this.dataForm.value.orientation._id,
        name: this.dataForm.value.orientation.name,
        slug: this.dataForm.value.orientation.slug,
      };
    }

 // region
    if (this.dataForm.value.region) {
      mData.type = {
        _id: this.dataForm.value.region._id,
        name: this.dataForm.value.region.name,
        slug: this.dataForm.value.region.slug,
      };
    }


    // Tags
    if (this.dataForm.value.tags) {
      // mData.tags
      mData.tags = []
      this.dataForm.value.tags.map((m) => {
        mData.tags.push(
          {
            _id: this.tags.find((f) => String(f._id) === m)._id,
            name: this.tags.find((f) => String(f._id) === m).name,
            slug: this.tags.find((f) => String(f._id) === m).slug,
          }
        )
      })
    }


    // Main Function
    if (this.product) {

      this.updateProductById(mData);

    } else {

      this.addProduct(mData);

    }
  }



  /**
   * HTTP REQ HANDLE
   * getAllTags()
   getProductById()
   * addProduct()
   * updateProductById()
   * deleteMultipleFile()
   */

  private getAllTags() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    };

    const filterData: FilterData = {
      pagination: null,
      filter: null,
      select: mSelect,
      sort: {name: 1},
    };

    this.subDataOne = this.tagService.getAllTag(filterData, null).subscribe({
      next: res => {
        this.tags = res.data;

      },
      error: error => {
        console.log(error);
      }
    });
  }

  private getProductById() {
    this.spinnerService.show();
    this.subDataThree = this.productService.getProductById(this.id).subscribe({
      next: res => {
        this.spinnerService.hide();
        if (res.success) {
          this.product = res.data;

          // Form Array
          this.setFormValue();
        }
      },
      error: error => {
        this.spinnerService.hide();
        console.log(error);
      }

    })
  }

  private addProduct(data: any) {
    this.spinnerService.show();
    this.subDataTwo = this.productService.addProduct(data).subscribe({
      next: res => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.formElement.resetForm();
          this.files = [];
        } else {
          this.uiService.warn(res.message);
        }
      },
      error: error => {
        this.spinnerService.hide();
        console.log(error);
      }
    });
  }

  private updateProductById(data: any) {
    this.spinnerService.show();
    this.subDataFour = this.productService
      .updateProductById(this.product._id, data)
      .subscribe({
        next: res => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);

            // Remove Old Image from Backend
            if (this.removeImages && this.removeImages.length) {
              this.deleteMultipleFile(this.removeImages);
            }
            this.files = [];
            this.oldImages = [];
          } else {
            this.uiService.warn(res.message);
          }
        },
        error: error => {
          this.spinnerService.hide();
          console.log(error);
        }
      });

  }


  private deleteMultipleFile(data: string[]) {
    this.subDataFive = this.fileUploadService.deleteMultipleFile(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  /**
   * IMAGE UPLOAD
   * onSelect()
   * patchPickedImagesUnique()
   * drop()
   * onRemove()
   * removeSelectImage()
   */

  onSelect(event: { addedFiles: any }) {
    this.files.push(...event.addedFiles);
  }


  private patchPickedImagesUnique(images: Gallery[]) {
    if (this.chooseImage && this.chooseImage.length > 0) {
      const nImages = images.map(m => m.url);
      this.chooseImage = this.utilsService.mergeArrayString(nImages, this.chooseImage);
    } else {
      this.chooseImage = images.map(m => m.url);
    }
    this.dataForm.patchValue(
      {images: this.chooseImage}
    );
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chooseImage, event.previousIndex, event.currentIndex);
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  removeSelectImage(s: string) {
    const index = this.chooseImage.findIndex(x => x === s);
    this.chooseImage.splice(index, 1);
  }

  /**
   * ON CATEGORY SELECT
   * onCategorySelect()
   * getEmiInput()
   */
  onCategorySelect(data: Category) {
    if (data) {
      this.selectedCategory = data;
    }
  }

  getEmiInput(value: number) {
    if (this.dataForm.value.emiMonth && this.dataForm.value.emiMonth.length) {
      const fIndex = this.dataForm.value.emiMonth.findIndex(f => f == value)
      if (fIndex > -1) {
        return value;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }


  /**
   * OPEN COMPONENT DIALOG
   * openGalleryDialog()
   */

  public openGalleryDialog() {
    const dialogRef = this.dialog.open(AllImagesDialogComponent, {
      data: {type: 'multiple', count: this.chooseImage.length ? (10 - this.chooseImage.length) : 10},
      panelClass: ['theme-dialog', 'full-screen-modal-lg'],
      width: '100%',
      minHeight: '100%',
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (dialogResult.data && dialogResult.data.length > 0) {
          this.patchPickedImagesUnique(dialogResult.data);
        }
      }
    });
  }


  // updateAllComplete() {
  //   this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  // }
  //
  // someComplete(): boolean {
  //   if (this.task.subtasks == null) {
  //     return false;
  //   }
  //   return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  // }
  //
  // setAll(completed: boolean) {
  //   this.allComplete = completed;
  //   if (this.task.subtasks == null) {
  //     return;
  //   }
  //   this.task.subtasks.forEach(t => (t.completed = completed));
  // }

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
    if (this.subDataThree) {
      this.subDataThree.unsubscribe();
    }
    if (this.subDataFour) {
      this.subDataFour.unsubscribe();
    }
    if (this.subDataFive) {
      this.subDataFive.unsubscribe();
    }
    if (this.subDataSix) {
      this.subDataSix.unsubscribe();
    }

    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
  }
}
