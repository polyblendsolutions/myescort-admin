import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators,} from '@angular/forms';
import {User} from 'src/app/interfaces/common/user.interface';
import {UiService} from '../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UsersService} from '../../../services/common/users.service';
import {Select} from 'src/app/interfaces/core/select';
import { environment } from 'src/environments/environment';

interface AccessOption {
  name: string;
  value: boolean;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  HasAccessControl = new FormControl<AccessOption | null>(
    null,
    Validators.required
  );

  IsVerfiedControl = new FormControl<AccessOption | null>(
    null,
    Validators.required
  );


  hasAccess: Select[] = [
    {value: true, viewValue: 'Yes'},
    {value: false, viewValue: 'No'},
  ];

  isVerfied: Select[] = [
    {value: true, viewValue: 'Yes'},
    {value: false, viewValue: 'No'},
  ];



  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  shortId: string;
  user?: User;



  // Subscriptions
  private userByIdSubscription: Subscription;
  private addUserSubscription: Subscription;
  private updateUserSubscription: Subscription;
  private routeParamsSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
  ) {}

  ngOnInit(): void {
    // Init Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.routeParamsSubscription = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getUserById();
      }
    });
  }

  /**
   * FORM METHODS
   * initDataForm()
   * setFormValue()
   * onSubmit()
   */

  private initDataForm() {
    this.dataForm = this.fb.group({
      username: [null, Validators.required],
      hasAccess: [null],
      isVerfied: [null],
      password: [null],
      email: new FormControl('', [Validators.email]),
      phone: [null, Validators.required],
    });
  }

  private setFormValue() {
    this.dataForm.patchValue(this.user);
    this.shortId = {...this.user}["shortId"]
  }
  
  shortIdRedirect(){
    window.location.href = `${environment.clientProductURL}/ad-details/${this.shortId}`
  }
  onSubmit() {
    if (this.dataForm.invalid) {

      this.uiService.warn('Please filed all the required field');
      return;
    }
    if (this.user) {

      this.updateUserById();

    } else {

      this.addUser();

    }
  }

  /**
   * HTTP REQ HANDLE
   * addUser()
   * getUserById()
   * updateUserById()
   * removeSingleFile()
   */


  private getUserById() {
    this.spinnerService.show();
    this.userByIdSubscription = this.userService.getUsersById(this.id).subscribe({
      next: (res) => {
        this.spinnerService.hide();
        if (res.data) {
          this.user = res.data;
          this.setFormValue();
        }
      },
      error: (error) => {
        this.spinnerService.hide();
        console.log(error);
      },
    });
  }

  private addUser() {
    this.spinnerService.show();
    this.addUserSubscription = this.userService.addUser(this.dataForm.value).subscribe({
      next: (res) => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.formElement.resetForm();
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

  private updateUserById() {
    this.spinnerService.show();
    this.updateUserSubscription = this.userService
      .updateUsersById(this.user._id, this.dataForm.value)
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
   * COMPONENT DIALOG
   */


  /**
   * ON DESTROY
   */

  ngOnDestroy() {
    if (this.userByIdSubscription) {
      this.userByIdSubscription.unsubscribe();
    }
    if (this.addUserSubscription) {
      this.addUserSubscription.unsubscribe();
    }
    if (this.updateUserSubscription) {
      this.updateUserSubscription.unsubscribe();
    }
    if (this.routeParamsSubscription) {
      this.routeParamsSubscription.unsubscribe();
    }
  }
}
