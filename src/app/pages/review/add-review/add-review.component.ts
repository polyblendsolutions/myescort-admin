import { Product } from './../../../interfaces/common/product.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Review } from 'src/app/interfaces/common/review.interface';
import { UiService } from '../../../services/core/ui.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReviewService } from '../../../services/common/review.service';
import { FileUploadService } from 'src/app/services/gallery/file-upload.service';
import { Select } from 'src/app/interfaces/core/select';
import { Gallery } from 'src/app/interfaces/gallery/gallery.interface';
import { AllImagesDialogComponent } from '../../gallery/images/all-images-dialog/all-images-dialog.component';
import { defaultUploadImage } from 'src/app/core/utils/app-data';
import { MatDialog } from '@angular/material/dialog';

interface AccessOption {
  name: string;
  value: boolean;
}
@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {


  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  review?: Review;
  autoSlug = true;
  // Image Upload
  files: File[] = [];
  pickedImage: any[] = [];
  oldImage: string[] = [];
  removeImage: string;

  // Image Picker
  pickedProfileImage: any = defaultUploadImage;
  pickedProductImage: any = defaultUploadImage;

  // status value 
  HasAccessControl = new FormControl<AccessOption | null>(
    null,
    Validators.required
  );

  hasAccess: Select[] = [
    { value: true, viewValue: 'Yes' },
    { value: false, viewValue: 'No' },
  ];

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subDataSix: Subscription;
  private subRouteOne: Subscription;
  private subAutoSlug: Subscription;


  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService,
    private router: Router,
    private fileUploadService: FileUploadService,
    private dialog: MatDialog
  ) {
  }


  ngOnInit(): void {
    // Init Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getReviewById();
      }
    });

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
      user: this.fb.group({
        name: [null],
        profileImg: [null]
      }),
      product: this.fb.group({
        name: [null],
        images: [null],
        slug: [null]
      }),
      review: [null],
      rating: [null],
      status: [null],
      reply: [null],
      replayDate: [null],
      priority: [null]
    });
  }

  private setFormValue() {
    if (this.review) {
      this.dataForm.patchValue(this.review);
      this.pickedProductImage = this.review.product?.images;
      this.pickedProductImage = this.review.user.profileImg;
    }
  }

  onSubmit() {

    if (this.dataForm.invalid) {
      console.log(this.dataForm.errors)
      this.uiService.warn('Please filed all the required field');
      return;
    }
    if (this.review) {
      if (this.files && this.files.length) {
        this.updateReviewWithImage()
      } else {
        this.updateReviewById();
      }
    } else {
      if (this.files && this.files.length) {
        this.addReviewWithImage()
      } else {
        this.addReview();
      }
    }
    console.log(this.dataForm.value);
  }

  /**
   * HTTP REQ HANDLE
   * getReviewById()
   * addReview()
   * updateReviewById()
   * removeSingleFile()
   */

  private getReviewById() {
    this.spinnerService.show();
    this.subDataOne = this.reviewService.getReviewById(this.id)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.data) {
            this.review = res.data;
            console.log('this.review', this.review)
            this.setFormValue();
          }
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }

  private addReview() {
    this.spinnerService.show();
    this.subDataTwo = this.reviewService.addReview(this.dataForm.value)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
            this.formElement.resetForm();
            // this.router.navigate(['../']);
          } else {
            this.uiService.warn(res.message);
          }
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }

  private updateReviewById() {
    this.spinnerService.show();
    this.subDataThree = this.reviewService.updateReviewById(this.review._id, this.dataForm.value)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            if (this.removeImage) {
              this.removeSingleFile(this.removeImage);
            }
            this.uiService.success(res.message);
            this.router.navigate(['review/all-review']);
          } else {
            this.uiService.warn(res.message);
          }

        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }



  /**
 * LOGICAL PART
 * autoGenerateSlug()
 */
  autoGenerateSlug() {
    if (this.autoSlug === true) {
      this.subAutoSlug = this.dataForm.get('product').get('name').valueChanges
        .pipe(
        // debounceTime(200),
        // distinctUntilChanged()
      ).subscribe(d => {
        const res = d?.trim().replace(/\s+/g, '-').toLowerCase();
        this.dataForm.get('product').patchValue({
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



  private removeSingleFile(data: string) {
    this.subDataFour = this.fileUploadService.removeSingleFile(data)
      .subscribe({
        next: (res => {
          console.log(res)
        }),
        error: error => {
          console.log(error)
        }
      })
  }


  /**
   * IMAGE UPLOAD
   * onSelect()
   * onRemove()
   * addReviewWithImage()
   * updateReviewWithImage()
   * removeSelectImage()
   * removeOldImage()
   */

  onSelect(event: { addedFiles: any; }) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  private addReviewWithImage() {
    this.subDataFive = this.fileUploadService.uploadMultiImageOriginal(this.files).subscribe((res) => {
      const images = res.map(m => m.url);
      this.dataForm.patchValue({ images: images[0] });
      this.addReview();
    })
  }

  private updateReviewWithImage() {
    this.subDataSix = this.fileUploadService.uploadMultiImageOriginal(this.files).subscribe((res) => {
      const images = res.map(m => m.url);
      this.dataForm.patchValue({ image: images[0] });
      this.removeImage = this.review.image ? this.review.image : null;
      this.updateReviewById();
    })
  }

  removeSelectImage(index: number) {
    if (this.files && this.files.length) {
      this.files.splice(index - this.oldImage.length, 1);
      this.pickedImage.splice(index, 1);
    } else {
      this.oldImage.splice(index, 1);
      this.pickedImage.splice(index, 1);
    }
  }

  removeOldImage(index: number) {
    this.removeImage = this.oldImage[index];
    this.oldImage.splice(index, 1);
    this.dataForm.patchValue({ image: null });
  }

  /**
 * COMPONENT DIALOG
 * openGalleryDialog()
 */

  public openGalleryDialog(type: 'profileImage' | 'productImage') {
    const dialogRef = this.dialog.open(AllImagesDialogComponent, {
      data: { type: 'single', count: 1 },
      panelClass: ['theme-dialog', 'full-screen-modal-lg'],
      width: '100%',
      minHeight: '100%',
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (dialogResult.data && dialogResult.data.length > 0) {
          const image: Gallery = dialogResult.data[0] as Gallery;
          if (type === 'profileImage') {
            this.dataForm.get('user').patchValue({ profileImg: image.url });
            this.pickedProfileImage = image.url;
          } else {
            this.dataForm.get('product').patchValue({ images: image.url });
            this.pickedProductImage = image.url;
          }
        }
      }
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
    if (this.subAutoSlug) {
      this.subAutoSlug.unsubscribe();
    }
  }

}
