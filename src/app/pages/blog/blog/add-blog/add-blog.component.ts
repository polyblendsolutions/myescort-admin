


import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {Blog} from 'src/app/interfaces/common/blog.interface';
import {UiService} from '../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {BlogService} from '../../../../services/common/blog.service';
import {FileUploadService} from 'src/app/services/gallery/file-upload.service';
import {Select} from 'src/app/interfaces/core/select';
import {CASES_TYPES, defaultUploadImage} from '../../../../core/utils/app-data';
import {MatDialog} from '@angular/material/dialog';
import {AllImagesDialogComponent} from '../../../gallery/images/all-images-dialog/all-images-dialog.component';
import {Gallery} from '../../../../interfaces/gallery/gallery.interface';
import {MatCheckboxChange} from '@angular/material/checkbox';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
Quill.register('modules/blotFormatter', BlotFormatter);



@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;


  // Ngx Quill
  modules: any = null;

  // Store Data
  id?: string;
  blog?: Blog;
  autoSlug = true;


  // Static Data
  blogTypes: Select[] = CASES_TYPES

  // Image Picker
  pickedImage = defaultUploadImage;
  pickedMobileImage = defaultUploadImage;
  pickedUserImage = defaultUploadImage;

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
    private blogService: BlogService,
    private router: Router,
    private fileUploadService: FileUploadService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    // Init Data Form
    this.initQuillModule();
    this.initDataForm();

    // GET ID FORM PARAM
    this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getBlogById();
      }
    });
    this.autoGenerateSlug();
  }




  /**
   * QUILL CONFIG
   * initQuillModule()
   */
  private initQuillModule() {
    this.modules = {
      blotFormatter: {
        // empty object for default behaviour.
      },
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction

          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ['clean'], // remove formatting button

          ['link', 'image', 'video'], // link and image, video
          ['emoji'],
        ],
      },
    };
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
      image: [null],
      slug:[null],
      priority:[null],
      bannerImage: [null],
      description: [null],
      userImage: [null],
      shortDescription: [null],
      seoTitle: [null],
      seoDescription: [null],
      keyWord: [null],
      isHtml: [null],
      htmlBase: [null],
      userName: [null],
      userDesignation: [null],
    });
  }

  private setFormValue() {
    if (this.blog && this.blog.image) {
      this.pickedImage = this.blog.image;
    }
    if (this.blog && this.blog['bannerImage']) {
      this.pickedMobileImage = this.blog['bannerImage'];
    }
    if (this.blog && this.blog['userImage']) {
      this.pickedUserImage = this.blog['userImage'];
    }

    if (this.blog['isHtml']) {
      this.dataForm.patchValue({htmlBase: this.blog.description});
    }
    this.dataForm.patchValue(this.blog);
  }

  
  /**
   * LOGICAL PART
   * autoGenerateSlug()
   */
  autoGenerateSlug() {
    if (this.autoSlug === true) {
      this.subAutoSlug = this.dataForm.get('name').valueChanges
        .pipe(
          // debounceTime(200),
          // distinctUntilChanged()
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

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }
    if (!this.blog) {
      this.addBlog();
    } else {
      this.updateBlogById();
    }

  }

  /**
   * HTTP REQ HANDLE
   * getBlogById()
   * addBlog()
   * updateBlogById()
   * removeSingleFile()
   */

  private getBlogById() {
    this.spinnerService.show();
    this.subDataOne = this.blogService.getBlogById(this.id).subscribe({
      next: (res) => {
        this.spinnerService.hide();
        if (res.data) {
          this.blog = res.data;
          this.setFormValue();
          console.log('this.blog', this.blog)
        }
      },
      error: (error) => {
        this.spinnerService.hide();
        console.log(error);
      },
    });
  }

  private addBlog() {

    this.spinnerService.show();
    this.subDataTwo = this.blogService
      .addBlog(this.dataForm.value)
      .subscribe({
        next: (res) => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
            this.formElement.resetForm();

            this.pickedImage = defaultUploadImage;
            this.pickedMobileImage = defaultUploadImage;
            this.pickedUserImage = defaultUploadImage;
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

  private updateBlogById() {
    this.spinnerService.show();
    this.subDataThree = this.blogService
      .updateBlogById(this.blog._id, this.dataForm.value)
      .subscribe({
        next: (res) => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
            this.pickedImage = defaultUploadImage;
            this.pickedMobileImage = defaultUploadImage;
            this.pickedUserImage = defaultUploadImage;
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
   * COMPONENT DIALOG
   * openGalleryDialog()
   */

  public openGalleryDialog(type: 'image' | 'bannerImage' | 'userImage') {
    const dialogRef = this.dialog.open(AllImagesDialogComponent, {
      data: {type: 'single', count: 1},
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
          if (type === 'bannerImage') {
            this.dataForm.patchValue({bannerImage: image.url});
            this.pickedMobileImage = image.url;
            console.log("p")
          }
          if(type === 'userImage') {
            this.dataForm.patchValue({userImage: image.url});
            this.pickedUserImage = image.url;
            console.log("l")
          }  if (type === 'image'){
            this.dataForm.patchValue({image: image.url});
            this.pickedImage = image.url;
            console.log("k")
          }
        }
      }
    });
  }


  /**
   * HTML EDIT FUNCTIONS
   * onChangeBaseHtml()
   * onCheckChange()
   */

  onChangeBaseHtml(event: string) {
    this.dataForm.patchValue({
      description: event
    })
  }

  onCheckChange(event: MatCheckboxChange) {
    this.dataForm.patchValue({
      description: null,
      htmlBase: null
    })
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
  }
}
