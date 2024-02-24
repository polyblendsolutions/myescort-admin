import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {Orientation} from "../../../../interfaces/common/orientation.interface";
import {Subscription} from "rxjs";
import {UiService} from "../../../../services/core/ui.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute} from "@angular/router";
import {OrientationService} from "../../../../services/common/orientation.service";

@Component({
  selector: 'app-add-orientation',
  templateUrl: './add-orientation.component.html',
  styleUrls: ['./add-orientation.component.scss']
})
export class AddOrientationComponent implements OnInit {
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  orientation?: Orientation;
  autoSlug = true;

  // Image Upload
  files: File[] = [];
  pickedImage: any[] = [];
  oldImage: string[] = [];


  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subRouteOne: Subscription;
  private subAutoSlug: Subscription;

  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private orientationService: OrientationService,
  ) {
  }

  ngOnInit(): void {
    // Init Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getOrientationById();
      }
    });
    // Auto Slug
    this.autoGenerateSlug();
  }

  /**
   * FORM METHODS
   * initDataForm()
   * setFormValue()
   * onSubmit()
   */

  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null],
      slug: [null],
      image: [null],
    });
  }

  private setFormValue() {
    this.dataForm.patchValue(this.orientation);
    if (this.orientation && this.orientation.image) {
      this.oldImage.push(this.orientation.image);
    }
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }
    if (this.orientation) {

      this.updateOrientationById();

    } else {

      this.addOrientation();

    }
  }

  /**
   * HTTP REQ HANDLE
   * getOrientationById()
   * addOrientation()
   * updateOrientationById()
   * removeSingleFile()
   */

  private getOrientationById() {
    this.spinnerService.show();
    this.subDataOne = this.orientationService.getOrientationById(this.id).subscribe({
      next: (res) => {
        this.spinnerService.hide();
        if (res.data) {
          this.orientation = res.data;
          this.setFormValue();
        }
      },
      error: (error) => {
        this.spinnerService.hide();
        console.log(error);
      },
    });
  }

  private addOrientation() {
    this.spinnerService.show();
    this.subDataTwo = this.orientationService.addOrientation(this.dataForm.value).subscribe({
      next: (res) => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.formElement.resetForm();
          this.files = [];
        } else {
          this.uiService.warn(res.message);
        }
      },
      error: (error) => {
        this.spinnerService.hide();
        console.log(error);
      },
    });
  }

  private updateOrientationById() {
    this.spinnerService.show();
    this.subDataThree = this.orientationService
      .updateOrientationById(this.orientation._id, this.dataForm.value)
      .subscribe({
        next: (res) => {
          this.spinnerService.hide();
          if (res.success) {

            this.uiService.success(res.message);

          } else {
            this.uiService.warn(res.message);
          }
        },
        error: (error) => {
          this.spinnerService.hide();
          console.log(error);
        },
      });
  }

  /**
   * IMAGE UPLOAD
   * onSelect()
   * onRemove()
   */

  onSelect(event: { addedFiles: any }) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }


  /**
   * LOGICAL PART
   * autoGenerateSlug()
   */
  autoGenerateSlug() {
    if (this.autoSlug === true) {
      this.subAutoSlug = this.dataForm.get('name').valueChanges
        .pipe(
        ).subscribe(d => {
          const res = d?.trim().replace(/\s+/g, '-').toLowerCase();
          this.dataForm.patchValue({
            slug: res
          });
        });
    } else {
      if (!this.subAutoSlug) {
        return;
      }
      this.subAutoSlug?.unsubscribe();
    }
  }

  /**
   * ON DESTROY
   * ngOnDestroy()
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

    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
    if (this.subAutoSlug) {
      this.subAutoSlug.unsubscribe();
    }
  }

}
