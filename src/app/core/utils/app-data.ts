
import {Select} from '../../interfaces/core/select';
import {AdminRolesEnum} from '../../enum/admin.roles.enum';
import {AdminPermissions} from "../../enum/admin-permission.enum";
import {FileTypes} from '../../enum/file-types.enum';
import {OrderStatus} from '../../enum/order.enum';

export const ADMIN_ROLES: Select[] = [
  {value: AdminRolesEnum.SUPER_ADMIN, viewValue: 'Super Admin'},
  {value: AdminRolesEnum.ADMIN, viewValue: 'Admin'},
  {value: AdminRolesEnum.EDITOR, viewValue: 'Editor'},
  {value: AdminRolesEnum.SALESMAN, viewValue: 'Sales Man'}
];


export const CASES_TYPES: Select[] = [
  {value: 'ongoing', viewValue: 'Ongoing'},
  {value: 'complete', viewValue: 'Complete'},
];


export const ADMIN_PERMISSIONS: Select[] = [
  {value: AdminPermissions.CREATE, viewValue: 'Create'},
  {value: AdminPermissions.GET, viewValue: 'Get'},
  {value: AdminPermissions.EDIT, viewValue: 'Edit'},
  {value: AdminPermissions.DELETE, viewValue: 'Delete'},
];

export const GENDERS: Select[] = [
  {value: 'male', viewValue: 'Male'},
  {value: 'female', viewValue: 'Female'},
  {value: 'other', viewValue: 'Other'}
];
export const DATA_BOOLEAN: Select[] = [
  {value: true, viewValue: 'Yes'},
  {value: false, viewValue: 'No'},
];

export const YEARS: Select[] = [
  {value: 2023, viewValue: '2023'},
  {value: 2022, viewValue: '2022'},
];

export const PROJECT_SOURCES: Select[] = [
  {value: 'Client Reference', viewValue: 'Client Reference'},
  {value: 'Facebook', viewValue: 'Facebook'},
  {value: 'Fiverr', viewValue: 'Fiverr'},
  {value: 'Linkedin', viewValue: 'Linkedin'},
  {value: 'Local Reference', viewValue: 'Local Reference'},
  {value: 'Website', viewValue: 'Website'},
];

export const FILE_TYPES: Select[] = [
  {value: FileTypes.IMAGE, viewValue: 'Image'},
  {value: FileTypes.VIDEO, viewValue: 'Video'},
  {value: FileTypes.PDF, viewValue: 'Pdf'}
];

export const REPORT_FILTER: Select[] = [
  // {value: 0, viewValue: 'Today'},
  {value: 1, viewValue: 'Last Day'},
  {value: 7, viewValue: 'Last 7 days'},
  {value: 15, viewValue: 'Last 15 days'},
  {value: 30, viewValue: 'Last 30 days'},
  {value: 60, viewValue: 'Last 60 days'},
  {value: 90, viewValue: 'Last 90 days'}
];

export const PRODUCT_STATUS: Select[] = [
  {value: 'draft', viewValue: 'Draft'},
  {value: 'publish', viewValue: 'Publish'},
];


export const EMI_MONTHS: Select[] = [
  {
    value: 3,
    viewValue: '3 Months'
  },
  {
    value: 6,
    viewValue: '6 Months'
  },
  {
    value: 12,
    viewValue: '12 Months'
  },
];

export const DISCOUNT_TYPES: Select[] = [
  {
    value: 1,
    viewValue: 'Percentage'
  },
  {
    value: 2,
    viewValue: 'Cash'
  },
];

export const AMOUNT_TYPES: Select[] = [
  {
    value: 1,
    viewValue: 'Percentage'
  },
  {
    value: 2,
    viewValue: 'Amount'
  },
];

export const CITIES = ['Barisal', 'Bhairab', 'Bogra', 'Brahmanbaria', 'Chandpur', 'Chittagong', 'Chowmuhani', 'Chuadanga', 'Comilla', 'Cox\'s Bazar', 'Dhaka', 'Dinajpur', 'Faridpur', 'Feni', 'Gazipur', 'Jamalpur', 'Jessore', 'Jhenaidah', 'Kaliakair', 'Khulna', 'Kishoreganj', 'Kushtia', 'Maijdee', 'Manikganj', 'Mymensingh', 'Naogaon', 'Narayanganj', 'Narsingdi', 'Nawabganj', 'Pabna', 'Rajshahi', 'Rangpur', 'Saidpur', 'Satkhira', 'Savar', 'Siddhirganj', 'Sirajganj', 'Sreepur', 'Sylhet', 'Tangail', 'Tongi'];

export const PAYMENT_TYPES: Select[] = [
  { value: 'cash_on_delivery', viewValue: 'Cash On Delivery'},
  { value: 'bkash', viewValue: 'Bkash'},
  { value: 'rocket', viewValue: 'Rocket'},
  { value: 'nagad', viewValue: 'Nagad'},
  { value: 'credit_card', viewValue: 'Visa/Mastercard'},
];

export const  PAYMENT_STATUS: Select[] = [
  { value: 'unpaid', viewValue: 'Unpaid'},
  { value: 'paid', viewValue: 'Paid'},
];

export const ORDER_STATUS: Select[] = [
  { value: OrderStatus.PENDING, viewValue: 'Pending'},
  { value: OrderStatus.CONFIRM, viewValue: 'Confirm'},
  { value: OrderStatus.PROCESSING, viewValue: 'Processing'},
  { value: OrderStatus.SHIPPING, viewValue: 'Shipping'},
  { value: OrderStatus.DELIVERED, viewValue: 'Delivered'},
  { value: OrderStatus.CANCEL, viewValue: 'Cancel'},
  { value: OrderStatus.REFUND, viewValue: 'Refund'},
];


export const DELIVERY_TIMES: any[] =  [
  // {value: '8.30 am to 10.00 am', viewValue: '8.30 am to 10.00 am', end: 6},
  // {value: '10.00 am to 11.30 am', viewValue: '10.00 am to 11.30 am', end: 8},
  // {value: '11.30 am to 01.00 pm', viewValue: '11.30 am to 01.00 pm', end: 9},
  // {value: '01.00 pm to 02.30 pm', viewValue: '01.00 pm to 02.30 pm', end: 11},
  // {value: '02.30 pm to 04.00 pm', viewValue: '02.30 pm to 04.00 pm', end: 13},
  // {value: '04.00 pm to 05.30 pm', viewValue: '04.00 pm to 05.30 pm', end: 14},
  // {value: '05.30 pm to 07.00 pm', viewValue: '05.30 pm to 07.00 pm', end: 15},
  // {value: '07.00 pm to 08.30 pm', viewValue: '07.00 pm to 08.30 pm', end: 17},


  {value: '08:30 am-09:30 am', viewValue: '08:30 am-09:30 am', end: 6},
  {value: '09:30 am-10:30 am', viewValue: '09:30 am-10:30 am', end: 7},
  {value: '10:30 am-11:30 am', viewValue: '10:30 am-11:30 am', end: 8},
  {value: '11:30 am-12:30 pm', viewValue: '11:30 am-12:30 pm', end: 9},
  {value: '12:30 pm-01:30 pm', viewValue: '12:30 pm-01:30 pm', end: 10},
  {value: '01:30 pm-02:30 pm', viewValue: '01:30 pm-02:30 pm', end: 11},
  {value: '02:30 pm-03:30 pm', viewValue: '02:30 pm-03:30 pm', end: 12},
  {value: '03:30 pm-04:30 pm', viewValue: '03:30 pm-04:30 pm', end: 13},
  {value: '04:30 pm-05:30 pm', viewValue: '04:30 pm-05:30 pm', end: 14},
  {value: '05:30 pm-06:30 pm', viewValue: '05:30 pm-06:30 pm', end: 15},
  {value: '06:30 pm-07:30 pm', viewValue: '06:30 pm-07:30 pm', end: 16},
  {value: '07:30 pm-08:30 pm', viewValue: '07:30 pm-08:30 pm', end: 17},
  {value: '08:30 pm-09:30 pm', viewValue: '08:30 pm-09:30 pm', end: 18},
];
export const defaultUploadImage = '/assets/images/avatar/image-upload.jpg';
export const VARIATION_IMG_PLACEHOLDER = '/assets/images/placeholder/image-pick-placeholder.png';
export const PDF_MAKE_LOGO = '/assets/images/png/haatlogo.png';


export const MONTHS: Select[] = [
  {value: 1, viewValue: 'January'},
  {value: 2, viewValue: 'February'},
  {value: 3, viewValue: 'March'},
  {value: 4, viewValue: 'April'},
  {value: 5, viewValue: 'May'},
  {value: 6, viewValue: 'June'},
  {value: 7, viewValue: 'July'},
  {value: 8, viewValue: 'August'},
  {value: 9, viewValue: 'September'},
  {value: 10, viewValue: 'October'},
  {value: 11, viewValue: 'November'},
  {value: 12, viewValue: 'December'},
];
