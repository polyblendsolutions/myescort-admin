import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {

  allPages: any[] = [
    {_id: 1, name: 'Support', slug: 'support'},
    // {_id: 9, name: 'Contact Us', slug: 'contact-us'},
    // {_id: 10, name: 'About Us', slug: 'about-us'},
    // {_id: 14, name: 'Return & Refund Policy', slug: 'return-&-refund-policy'},
    {_id: 15, name: 'Privacy Policy', slug: 'privacy-policy'},
    {_id: 16, name: 'Terms and Conditions', slug: 'terms-and-conditions'},
    {_id: 17, name: 'Advertising', slug: 'advertising'},
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
