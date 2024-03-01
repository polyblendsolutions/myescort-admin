import {AdminMenu} from '../../interfaces/core/admin-menu.interface';

export const SUPER_ADMIN_MENU: AdminMenu[] = [
  {
    id: 0,
    name: 'Dashboard',
    hasSubMenu: false,
    routerLink: 'dashboard',
    icon: 'space_dashboard',
    subMenus: [],
  },
  {
    id: 1,
    name: 'Customization',
    hasSubMenu: true,
    routerLink: null,
    icon: 'auto_fix_off',
    subMenus: [
      
      {
        id: 2,
        name: 'Banner',
        hasSubMenu: true,
        routerLink: 'customization/all-banner',
        icon: 'arrow_right',
      }
    ],
  },

  {
    id: 2,
    name: 'Catalog',
    hasSubMenu: true,
    routerLink: null,
    icon: 'category',
    subMenus: [
      {
        id: 1,
        name: 'Categories',
        hasSubMenu: true,
        routerLink: 'catalog/all-categories',
        icon: 'arrow_right',
      },
      {
        id: 2,
        name: ' Sub Categories',
        hasSubMenu: true,
        routerLink: 'catalog/all-subCategories',
        icon: 'arrow_right',
      },
      

      {
        id: 6,
        name: 'Tags',
        hasSubMenu: true,
        routerLink: 'catalog/all-tag',
        icon: 'arrow_right',
      },
      {
        id: 7,
        name: 'Types',
        hasSubMenu: true,
        routerLink: 'catalog/all-type',
        icon: 'arrow_right',
      },
      {
        id: 8,
        name: 'Body Type',
        hasSubMenu: true,
        routerLink: 'catalog/all-bodyType',
        icon: 'arrow_right',
      },
      {
        id: 9,
        name: 'Hair Color',
        hasSubMenu: true,
        routerLink: 'catalog/all-hairColor',
        icon: 'arrow_right',
      },
      {
        id: 10,
        name: 'Intimate Hair',
        hasSubMenu: true,
        routerLink: 'catalog/all-intimateHair',
        icon: 'arrow_right',
      },
      {
        id: 11,
        name: 'Orientation',
        hasSubMenu: true,
        routerLink: 'catalog/all-orientation',
        icon: 'arrow_right',
      },
      
    ],
  },

  {
    id: 3,
    name: 'Ads',
    hasSubMenu: true,
    routerLink: null,
    icon: 'inventory',
    subMenus: [
      {
        id: 1,
        name: 'Add Ads',
        hasSubMenu: true,
        routerLink: 'product/add-product',
        icon: 'arrow_right',
      },
      {
        id: 2,
        name: 'Ads List',
        hasSubMenu: true,
        routerLink: 'product/all-product',
        icon: 'arrow_right',
      }
    ],
  },

  {
    id: 4,
    name: 'Gallery',
    hasSubMenu: true,
    routerLink: null,
    icon: 'collections',
    subMenus: [
      {
        id: 1,
        name: 'Images',
        hasSubMenu: true,
        routerLink: 'gallery/all-images',
        icon: 'arrow_right',
      },
      {
        id: 2,
        name: 'Folders',
        hasSubMenu: true,
        routerLink: 'gallery/all-folders',
        icon: 'arrow_right',
      }
    ],
  },

 


  {
    id: 120,
    name: 'Address',
    hasSubMenu: true,
    routerLink: null,
    icon: 'local_offer',
    subMenus: [
      {
        id: 1,
        name: 'All Region',
        hasSubMenu: true,
        routerLink: 'address/all-divisions',
        icon: 'arrow_right',
      },
      {
        id: 2,
        name: 'Division',
        hasSubMenu: true,
        routerLink: 'address/all-area',
        icon: 'arrow_right',
      },
      {
        id: 3,
        name: 'City',
        hasSubMenu: true,
        routerLink: 'address/all-zone',
        icon: 'arrow_right',
      }
    ],
  },

  {
    id: 7,
    name: 'User',
    hasSubMenu: true,
    routerLink: null,
    icon: 'person_3',
    subMenus: [
      {
        id: 1,
        name: 'All User',
        hasSubMenu: true,
        routerLink: 'user/user-list',
        icon: 'arrow_right',
      }
    ],
  },
  {
    id: 8,
    name: 'Admin Control',
    hasSubMenu: true,
    routerLink: null,
    icon: 'admin_panel_settings',
    subMenus: [
      {
        id: 1,
        name: 'All Admin',
        hasSubMenu: true,
        routerLink: 'admin-control/all-admins',
        icon: 'arrow_right',
      }
    ],
  },

  {
    id: 9,
    name: 'Blog Area',
    hasSubMenu: true,
    routerLink: null,
    icon: 'rss_feed',
    subMenus: [
      {
        id: 1,
        name: 'Blog',
        hasSubMenu: true,
        routerLink: 'blog/all-blog',
        icon: 'arrow_right',
      }
    ],
  },
 

  {
    id: 11,
    name: 'Report',
    hasSubMenu: false,
    routerLink: 'report/all-report',
    icon: 'rate_review',
    subMenus: [],
  },

  {
    id: 1122,
    name: 'Verification',
    hasSubMenu: false,
    routerLink: 'verification',
    icon: 'rate_review',
    subMenus: [
      // {
      //   id: 1,
      //   name: 'All Verification',
      //   hasSubMenu: true,
      //   routerLink: 'verification',
      //   icon: 'arrow_right',
      // }
    ],
  },

  {
    id: 12,
    name: 'Additional Page',
    hasSubMenu: true,
    routerLink: null,
    icon: 'note_add',
    subMenus: [
      {
        id: 1,
        name: 'Page List',
        hasSubMenu: true,
        routerLink: 'additionl-page/page-list',
        icon: 'arrow_right',
      }

    ],
  },


  {
    id: 13,
    name: 'Profile',
    hasSubMenu: false,
    routerLink: 'profile',
    icon: 'person',

    subMenus: [

    ],
  },



]
