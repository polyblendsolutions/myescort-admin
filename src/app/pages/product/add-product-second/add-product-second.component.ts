import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/interfaces/common/area.interface';
import { BodyType } from 'src/app/interfaces/common/bodyType.interface';
import { Category } from 'src/app/interfaces/common/category.interface';
import { Division } from 'src/app/interfaces/common/division.interface';
import { HairColor } from 'src/app/interfaces/common/hairColor.interface';
import { IntimateHair } from 'src/app/interfaces/common/intimateHair.interface';
import { Orientation } from 'src/app/interfaces/common/orientation.interface';
import { Product } from 'src/app/interfaces/common/product.interface';
import { Tag } from 'src/app/interfaces/common/tag.interface';
import { Type } from 'src/app/interfaces/common/type.interface';
import { Zone } from 'src/app/interfaces/common/zone.interface';
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { Pagination } from 'src/app/interfaces/core/pagination';
import { Select } from 'src/app/interfaces/core/select';
import { Gallery } from 'src/app/interfaces/gallery/gallery.interface';
import { AreaService } from 'src/app/services/common/area.service';
import { BodyTypeService } from 'src/app/services/common/bodyType.service';
import { CategoryService } from 'src/app/services/common/category.service';
import { DivisionService } from 'src/app/services/common/division.service';
import { HairColorService } from 'src/app/services/common/hairColor.service';
import { IntimateHairService } from 'src/app/services/common/intimateHair.service';
import { OrientationService } from 'src/app/services/common/orientation.service';
import { ProductService } from 'src/app/services/common/product.service';
import { TagService } from 'src/app/services/common/tag.service';
import { TypeService } from 'src/app/services/common/type.service';
import { ZoneService } from 'src/app/services/common/zone.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import { UiService } from 'src/app/services/core/ui.service';
import { FileUploadService } from 'src/app/services/gallery/file-upload.service';
import { GalleryService } from 'src/app/services/gallery/gallery.service';

@Component({
  selector: 'app-add-product-second',
  templateUrl: './add-product-second.component.html',
  styleUrls: ['./add-product-second.component.scss'],
})
export class AddProductSecondComponent implements OnInit {
  @ViewChild('formElement') formElement: NgForm;
  // Store Data
  tags: Tag[] = [];
  //Store Data
  product: Product;
  products: Product[] = [];
  types: Type[] = [];
  categorys: Category[] = [];
  hairColors: HairColor[] = [];
  bodyTypes: BodyType[] = [];
  intimateHairs: IntimateHair[] = [];
  orientations: Orientation[] = [];
  divisions: Division[] = [];
  area: Area[] = [];
  zone: Zone[] = [];
  id?: string;
  @Input() pagination: Pagination = null;

  acceptTerms: boolean = false;

  // Image
  files: File[] | any = [];
  pickedImage: any[] = [];
  oldImages: string[] = [];
  removeImages: string[] = [];

  //Form Variables
  dataForm!: FormGroup;
  mondayHoursArray?: FormArray;
  tuesdayHoursArray?: FormArray;

  wednesdayHoursArray?: FormArray;
  thursdayHoursArray?: FormArray;

  fridayHoursArray?: FormArray;
  saturdayHoursArray?: FormArray;
  pricingDataArray?: FormArray;
  showCreate: boolean = false;
  showAll: boolean = false;

  onSelectedCategory: string = 's';
  onSelectedType: string = ';df';

  // FilterData
  filter: any = null;

  // Loading
  isLoading: boolean = false;

  // all Days
  allDays: Select[] = [
    { value: 'Monday', viewValue: 'Monday' },
    { value: 'Tuesday', viewValue: 'Tuesday' },
    { value: 'Wednesday', viewValue: 'Wednesday' },
    { value: 'Thursday', viewValue: 'Thursday' },
    { value: 'Friday', viewValue: 'Friday' },
    { value: 'Saturday', viewValue: 'Saturday' },
    { value: 'Sunday', viewValue: 'Sunday' },
  ];

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subDataSix: Subscription;
  private subDataSeven: Subscription;
  private subForm: Subscription;
  private subDivisionData: Subscription;
  private subAreaData: Subscription;
  private subZoneData: Subscription;
  private subParamp: Subscription;

  constructor(
    private uiService: UiService,
    private typeService: TypeService,
    private hairColorService: HairColorService,
    private intimateHairService: IntimateHairService,
    private orientationService: OrientationService,
    private divisionService: DivisionService,
    private areaService: AreaService,
    private zoneService: ZoneService,
    private categoryService: CategoryService,
    private bodyTypeService: BodyTypeService,
    private fb: FormBuilder,
    private tagService: TagService,
    private fileUploadService: FileUploadService,
    private galleryService: GalleryService,
    private reloadService: ReloadService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.subParamp = this.activatedRoute.queryParamMap.subscribe((res) => {
    //   this.id = res.get('id');
    //   console.log('this.id',this.id)
    //   if (this.id) {
    //     this.showCreate = true;
    //     this.showAll = true;
    //     this.getSingleProductById(this.id);
    //   }
    // });


        // GET ID FORM PARAM
        this.subParamp = this.activatedRoute.paramMap.subscribe((param) => {
          this.id = param.get('id');

          if (this.id) {
            this.showCreate = true;
            this.showAll = true;
            this.getSingleProductById(this.id);
          }
        });
    this.initForm();
    // Base Data
    this.getAllType();
    this.getAllCategory();
    this.getAllHairColor();
    this.getAllIntimateHair();
    this.getAllOrientation();
    this.getAllDivision();
    this.getAllBodyType();
    this.getAllProducts();
    this.getAllTags();
  }

  /***
   * FORM HANDLE
   * initForm()
   * onSubmit()
   */

  initForm() {
    this.dataForm = this.fb.group({
      description: [null],
      category: [null, Validators.required],
      type: [null, Validators.required],
      bodyType: [null],
      name: [null,Validators.required],
      hairColor: [null],
      intimateHair: [null],
      orientation: [null],
      division: [null],
      zone: [null],
      area: [null],
      shortDescription: [null],
      priceValue: [null],
      brand: [null],
      newPricing: [null],
      serviceDescription: [null],
      tags: [null],
      openingHours: [null],
      // title: [null, Validators.required],
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
      whatsApp: [null],
      email: [null],
      homePage: [null],
      images: [null],
      timing: [null],
      videoUrl: [null],
      status: 'publish',
      // Complex Day
      mondayHours: this.fb.array([]),
      tuesdayHours: this.fb.array([]),
      wednesdayHours: this.fb.array([]),
      thursdayHours: this.fb.array([]),
      fridayHours: this.fb.array([]),
      saturdayHours: this.fb.array([]),
      pricing: this.fb.array([
        this.createObjectElement()
      ]),
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

    this.mondayHoursArray = this.dataForm.get('mondayHours') as FormArray;
    this.tuesdayHoursArray = this.dataForm.get('tuesdayHours') as FormArray;
    this.wednesdayHoursArray = this.dataForm.get('wednesdayHours') as FormArray;
    this.thursdayHoursArray = this.dataForm.get('thursdayHours') as FormArray;
    this.fridayHoursArray = this.dataForm.get('fridayHours') as FormArray;
    this.saturdayHoursArray = this.dataForm.get('saturdayHours') as FormArray;
    this.pricingDataArray = this.dataForm.get('pricing') as FormArray;
    this.onAddNewFormArrayObject('mondayHours');
    this.onAddNewFormArrayObject('tuesdayHours');
    this.onAddNewFormArrayObject('wednesdayHours');
    this.onAddNewFormArrayObject('thursdayHours');
    this.onAddNewFormArrayObject('fridayHours');
    this.onAddNewFormArrayObject('saturdayHours');
  }

  createObjectElement() {
    return this.fb.group({
      serviceDescription: [null],
      timing: [null],
      priceValue: [null],
    });
  }

  addFormArrayObject(formControl: string) {
    const f = this.fb.group({
      serviceDescription: [null],
      timing: [null],
      priceValue: [null],
    });
    (this.dataForm?.get(formControl) as FormArray).push(f);
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
      case 'pricing': {
        formDataArray = this.pricingDataArray;
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

  onSubmit() {
    // if (!this.acceptTerms) {
    //   this.uiService.wrong('Please accept terms and conditions');
    //   return;
    // }
    if (this.dataForm.invalid) {
      this.uiService.warn('Invali form');
      this.dataForm.markAllAsTouched();
    } else {
      let selectCategory = this.categorys.find(
        (d) => d._id === this.dataForm.value.category
      );
      let selectType = this.types.find(
        (d) => d._id === this.dataForm.value.type
      );
      let selectHairColor = this.hairColors.find(
        (d) => d._id === this.dataForm.value.hairColor
      );
      let selectIntimateHair = this.intimateHairs.find(
        (d) => d._id === this.dataForm.value.intimateHair
      );
      let selectBodyType = this.bodyTypes.find(
        (d) => d._id === this.dataForm.value.bodyType
      );
      let selectDivision = this.divisions.find(
        (d) => d._id === this.dataForm.value.division
      );
      let selectArea = this.area.find(
        (d) => d._id === this.dataForm.value.area
      );
      let selectZone = this.zone.find(
        (d) => d._id === this.dataForm.value.zone
      );
      let selectOrientation = this.orientations.find(
        (d) => d._id === this.dataForm.value.orientation
      );



      const mData = {
        ...this.dataForm.value,
        ...{ category: selectCategory },
        ...{ type: selectType },
        ...{ division: selectDivision },
        ...{ hairColor: selectHairColor },
        ...{ intimateHair: selectIntimateHair },
        ...{ bodyType: selectBodyType },
        ...{ area: selectArea },
        ...{ zone: selectZone },
        ...{ orientation: selectOrientation },
      };

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

      this.isLoading = true;
      // Main Function
      if (this.product) {
        if (this.files && this.files.length) {
          this.updateProductWithImage(mData);
        } else {
          this.updateProductById(this.id, mData);
        }
      } else {
        if (this.files && this.files.length) {
          this.addProductWithImage(mData);
        } else {
          this.addProduct(mData);
        }
      }
    }
  }

  /**
   * IMAGE DRUG & DROP
   */
  onSelect(event: { addedFiles: any }) {
    this.files.push(...event.addedFiles);
    this.onUploadImages();
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  private addProductWithImage(data: any) {
    this.subDataFive = this.fileUploadService
      .uploadMultiImageOriginal(this.files)
      .subscribe((res) => {
        const images = res.map((m) => m.url);
        const mData = { ...data, ...{ images: images } };
        this.addProduct(mData);
      });
  }

  private updateProductWithImage(data: any) {
    this.subDataSix = this.fileUploadService
      .uploadMultiImageOriginal(this.files)
      .subscribe((res) => {
        const images = res.map((m) => m.url);
        const mData = {
          ...data,
          ...{ images: [...this.oldImages, ...images] },
        };
        this.updateProductById(this.id, mData);
      });
  }

  removeSelectImage(index: number) {
    if (this.files && this.files.length) {
      this.files.splice(index - this.oldImages.length, 1);
      this.pickedImage.splice(index, 1);
    } else {
      this.oldImages.splice(index, 1);
      this.pickedImage.splice(index, 1);
    }
  }

  removeOldImage(index: number) {
    this.removeImages.push(this.oldImages[index]);
    this.oldImages.splice(index, 1);
    this.dataForm.patchValue({ images: this.oldImages });
  }

  /**
   * ON IMAGE UPLOAD
   */
  onUploadImages() {
    if (!this.files || this.files.length <= 0) {
      this.uiService.warn('No Image selected!');
      return;
    }
    this.fileUploadService
      .uploadMultiImageOriginalV2(this.files, null)
      .subscribe({
        next: (res) => {
          const data: Gallery[] = res.map((m) => {
            return {
              url: m.url,
              name: m.name,
              size: m.size,
              folder: 'user-product',
              type: 'image',
            } as Gallery;
          });

          this.addImagesToGallery(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  /**
   * HTTP REQ HANDLE
   */

  private addImagesToGallery(data: Gallery[]) {
    this.galleryService.insertManyGallery(data).subscribe({
      next: (res) => {
        let images = res.data.map((d) => d.url);
        this.dataForm.patchValue({ images: images });
        this.reloadService.needRefreshData$();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  /**
   * HTTP REQ HANDLE
   * getAllType()
   * getAllCategory();
   * getAllHairColor();
   * getAllIntimateHair();
   * getAllOrientation();
   * getAllDivision();
   * getAllArea();
   * getAllZone();
   * getAllBodyType();
   * addProduct()
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

  private getAllType() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    };

    const filter: FilterData = {
      filter: null,
      pagination: null,
      select: mSelect,
      sort: { name: 1 },
    };

    this.subDataOne = this.typeService.getAllType(filter, null).subscribe({
      next: (res) => {
        if (res.success) {
          this.types = res.data;
          console.log('this.types', this.types);
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
      slug: 1,
    };

    const filter: FilterData = {
      filter: null,
      pagination: null,
      select: mSelect,
      sort: { name: 1 },
    };

    this.subDataTwo = this.categoryService
      .getAllCategory(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.categorys = res.data;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private getAllHairColor() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    };

    const filter: FilterData = {
      filter: null,
      pagination: null,
      select: mSelect,
      sort: { name: 1 },
    };

    this.subDataThree = this.hairColorService
      .getAllHairColor(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.hairColors = res.data;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private getAllIntimateHair() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    };

    const filter: FilterData = {
      filter: null,
      pagination: null,
      select: mSelect,
      sort: { name: 1 },
    };

    this.subDataFour = this.intimateHairService
      .getAllIntimateHair(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.intimateHairs = res.data;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private getAllOrientation() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    };

    const filter: FilterData = {
      filter: this.filter,
      pagination: null,
      select: mSelect,
      sort: { name: 1 },
    };

    this.subDataFive = this.orientationService
      .getAllOrientation(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.orientations = res.data;
            console.log('this.orientations', this.orientations);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private getAllDivision() {
    let mSelect = {
      name: 1,
      slug: 1,
    };
    const filter: FilterData = {
      filter: { status: 'publish' },
      select: mSelect,
      pagination: null,
      sort: { createdAt: -1 },
    };

    this.subDivisionData = this.divisionService
      .getAllDivisions(filter)
      .subscribe(
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
      );
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
    );
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
    );
  }

  private getAllBodyType() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    };

    const filter: FilterData = {
      filter: null,
      pagination: null,
      select: mSelect,
      sort: { name: 1 },
    };

    this.subDataSeven = this.bodyTypeService
      .getAllBodyType(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.bodyTypes = res.data;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getSingleProductById(id: string) {
    this.subDataOne = this.productService.getProductById(id).subscribe(
      (res) => {
        if (res.success) {
          this.product = res.data;
          console.log('this.product', this.product);
          if (this.product) {
            this.dataForm.patchValue(this.product);
            this.dataForm.patchValue({ category: this.product?.category?._id });
            this.dataForm.patchValue({ type: this.product?.type?._id });
            this.dataForm.patchValue({ division: this.product?.division?._id });
            this.dataForm.patchValue({ area: this.product?.area?._id });
            this.dataForm.patchValue({ zone: this.product?.zone?._id });
            this.dataForm.patchValue({
              hairColor: this.product?.hairColor?._id,
            });
            this.dataForm.patchValue({
              orientation: this.product?.orientation?._id,
            });
            this.dataForm.patchValue({ bodyType: this.product?.bodyType?._id });
            this.dataForm.patchValue({
              intimateHair: this.product?.intimateHair?._id,
            });
            this.getAllArea(this.dataForm.get('division')?.value);
            this.getAllZone(this.dataForm.get('area')?.value);
            // Form Array
            this.removeFormArrayField('mondayHours', 0)
            this.product.mondayHours.map((m) => {
              const f = this.fb.group({
                startHour: [m.startHour],
                endHour: [m.endHour],
              });
              (this.dataForm?.get('mondayHours') as FormArray).push(f);
            });



    // Tags
    if (this.product.tags && this.product.tags.length) {
      this.dataForm.patchValue({
        tags: this.product.tags.map(m => m._id)
      })
    }

            // Form Array
            this.removeFormArrayField('tuesdayHours', 0)
            this.product.tuesdayHours.map((m) => {
              const f = this.fb.group({
                startHour: [m.startHour],
                endHour: [m.endHour],
              });
              (this.dataForm?.get('tuesdayHours') as FormArray).push(f);
            });

            this.removeFormArrayField('pricing', 0)
    this.product.pricing.map(m => {
      const f = this.fb.group({
        serviceDescription: [m.serviceDescription],
        timing: [m.timing],
        priceValue: [m.priceValue],
      });
      (this.dataForm?.get('pricing') as FormArray).push(f);
    });


            // Form Array
            this.removeFormArrayField('wednesdayHours', 0)
            this.product.wednesdayHours.map((m) => {
              const f = this.fb.group({
                startHour: [m.startHour],
                endHour: [m.endHour],
              });
              (this.dataForm?.get('wednesdayHours') as FormArray).push(f);
            });

            // Form Array
            this.removeFormArrayField('thursdayHours', 0)
            this.product.thursdayHours.map((m) => {
              const f = this.fb.group({
                startHour: [m.startHour],
                endHour: [m.endHour],
              });
              (this.dataForm?.get('thursdayHours') as FormArray).push(f);
            });

            // Form Array
            this.removeFormArrayField('fridayHours', 0)
            this.product.fridayHours.map((m) => {
              const f = this.fb.group({
                startHour: [m.startHour],
                endHour: [m.endHour],
              });
              (this.dataForm?.get('fridayHours') as FormArray).push(f);
            });

            // Form Array
            this.removeFormArrayField('saturdayHours', 0)
            this.product.saturdayHours.map((m) => {
              const f = this.fb.group({
                startHour: [m.startHour],
                endHour: [m.endHour],
              });
              (this.dataForm?.get('saturdayHours') as FormArray).push(f);
            });

            if (this.product.images && this.product.images.length) {
              this.oldImages = this.product.images;
            }
          }
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }


  private addProduct(data: any) {
    this.subDataTwo = this.productService.addProduct(data).subscribe({
      next: res => {
        if (res.success) {
          this.uiService.success(res.message);
          this.formElement.resetForm();
          this.files = [];
        } else {
          this.uiService.warn(res.message);
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }

  private updateProductById(id: string, data: Product) {
    this.subDataOne = this.productService
      .updateProductById(id, data)
      .subscribe(
        (res) => {
          if (res.success) {
            this.uiService.success(res.message);
            this.isLoading = false;
            // this.router.navigate(['/account/my-list']);
          }
        },
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
  }


  // private updateProductById(id: string, data: Product) {
  //   this.subDataFour = this.productService
  //     .updateProductById(this.product._id, data)
  //     .subscribe({
  //       next: res => {
  //         if (res.success) {
  //           this.uiService.success(res.message);

  //           // Remove Old Image from Backend
  //           if (this.removeImages && this.removeImages.length) {
  //             this.deleteMultipleFile(this.removeImages);
  //           }
  //           this.files = [];
  //           this.oldImages = [];
  //         } else {
  //           this.uiService.warn(res.message);
  //         }
  //       },
  //       error: error => {

  //         console.log(error);
  //       }
  //     });

  // }

  private getAllProducts() {
    const mSelect = {
      image: 1,
      title: 1,
      slug: 1,
      images: 1,
      createdAt: 1,
      division: 1,
    };

    const filter: FilterData = {
      filter: { ...this.filter, ...{ status: 'publish' } },
      pagination: this.pagination,
      select: mSelect,
      sort: { createdAt: -1 },
    };

    this.subDataOne = this.productService
      .getAllProducts(filter, null)
      .subscribe({
        next: (res) => {
          if (res) {
            this.products = res.data.slice(0, 1);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
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

  onShowCreate(data) {
    if (data) {
      this.showCreate = true;
    }
  }

  onCategoryChange(val: string) {
    if (val) {
      this.showAll = true;
      this.onSelectedCategory = val;
    }
  }

  onTypeChange(val: string) {
    if (val) {
      this.showCreate = true;
      this.onSelectedType = val;
    }
  }

  onCheckTerms() {
    this.acceptTerms = !this.acceptTerms;
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
    if (this.subDataSeven) {
      this.subDataSeven.unsubscribe();
    }
    if (this.subForm) {
      this.subForm.unsubscribe();
    }

    if (this.subDivisionData) {
      this.subDivisionData.unsubscribe();
    }
    if (this.subAreaData) {
      this.subAreaData.unsubscribe();
    }
    if (this.subZoneData) {
      this.subZoneData.unsubscribe();
    }
    if (this.subParamp) {
      this.subParamp.unsubscribe();
    }
  }
}
