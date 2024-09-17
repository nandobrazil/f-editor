import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {InputGroupModule} from "primeng/inputgroup";
import {InputTextModule} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";
import {TableModule} from "primeng/table";
import {PaginatorModule} from "primeng/paginator";
import {BehaviorSubject, debounceTime, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-exemplo',
  standalone: true,
  imports: [
    CardModule,
    InputGroupModule,
    InputTextModule,
    ButtonDirective,
    TableModule,
    PaginatorModule
  ],
  templateUrl: './exemplo.component.html',
  styleUrl: './exemplo.component.scss'
})
export default class ExemploComponent implements OnInit, OnDestroy {
  products: any = [
    {
      "id": "1001",
      "code": "nvklal433",
      "name": "Black Watch",
      "description": "Elegant black wristwatch.",
      "image": "black-watch.jpg",
      "price": 72,
      "category": "Accessories",
      "quantity": 61,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1002",
      "code": "zz21cz3c1",
      "name": "Blue T-Shirt",
      "description": "Comfortable blue t-shirt.",
      "image": "blue-tshirt.jpg",
      "price": 29,
      "category": "Clothing",
      "quantity": 50,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    },
    {
      "id": "1003",
      "code": "244wgerg2",
      "name": "Running Shoes",
      "description": "High-performance running shoes.",
      "image": "running-shoes.jpg",
      "price": 85,
      "category": "Shoes",
      "quantity": 15,
      "inventoryStatus": "LOWSTOCK",
      "rating": 4
    },
    {
      "id": "1004",
      "code": "h456wer53",
      "name": "Silver Necklace",
      "description": "Stylish silver necklace.",
      "image": "silver-necklace.jpg",
      "price": 35,
      "category": "Accessories",
      "quantity": 75,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    },
    {
      "id": "1005",
      "code": "av2231fwg",
      "name": "Leather Wallet",
      "description": "Durable leather wallet.",
      "image": "leather-wallet.jpg",
      "price": 40,
      "category": "Accessories",
      "quantity": 20,
      "inventoryStatus": "LOWSTOCK",
      "rating": 3
    },
    {
      "id": "1006",
      "code": "bib36pfa2",
      "name": "Red Scarf",
      "description": "Warm red scarf.",
      "image": "red-scarf.jpg",
      "price": 25,
      "category": "Clothing",
      "quantity": 60,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1007",
      "code": "mbvjkgip5",
      "name": "Wool Hat",
      "description": "Cozy wool hat.",
      "image": "wool-hat.jpg",
      "price": 19,
      "category": "Clothing",
      "quantity": 40,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1008",
      "code": "vbb124btr",
      "name": "Smartphone",
      "description": "Latest model smartphone.",
      "image": "smartphone.jpg",
      "price": 699,
      "category": "Electronics",
      "quantity": 12,
      "inventoryStatus": "LOWSTOCK",
      "rating": 5
    },
    {
      "id": "1009",
      "code": "cm230f032",
      "name": "Laptop",
      "description": "Powerful gaming laptop.",
      "image": "laptop.jpg",
      "price": 1200,
      "category": "Electronics",
      "quantity": 8,
      "inventoryStatus": "OUTOFSTOCK",
      "rating": 5
    },
    {
      "id": "1010",
      "code": "plb34234v",
      "name": "Headphones",
      "description": "Noise-cancelling headphones.",
      "image": "headphones.jpg",
      "price": 120,
      "category": "Electronics",
      "quantity": 32,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1011",
      "code": "4920nnc2d",
      "name": "Bluetooth Speaker",
      "description": "Portable Bluetooth speaker.",
      "image": "bluetooth-speaker.jpg",
      "price": 55,
      "category": "Electronics",
      "quantity": 22,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1012",
      "code": "250vm23cc",
      "name": "Gym Bag",
      "description": "Spacious gym bag.",
      "image": "gym-bag.jpg",
      "price": 40,
      "category": "Accessories",
      "quantity": 30,
      "inventoryStatus": "INSTOCK",
      "rating": 3
    },
    {
      "id": "1013",
      "code": "mnb5mb2r5",
      "name": "Sunglasses",
      "description": "Stylish polarized sunglasses.",
      "image": "sunglasses.jpg",
      "price": 55,
      "category": "Accessories",
      "quantity": 45,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1014",
      "code": "r23fwf2r2",
      "name": "Casual Shoes",
      "description": "Comfortable casual shoes.",
      "image": "casual-shoes.jpg",
      "price": 65,
      "category": "Shoes",
      "quantity": 28,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1015",
      "code": "pxpzczo23",
      "name": "Wireless Charger",
      "description": "Fast wireless charger.",
      "image": "wireless-charger.jpg",
      "price": 25,
      "category": "Electronics",
      "quantity": 50,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    }
  ]


  cloneProducts: any = [...this.products];

  debounceSearch: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
  destroy$: Subject<void> = new Subject<void>();
  filtro: string | undefined;

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filterTable() {
    if (!this.filtro || this.filtro === '') {
      this.products = [...this.cloneProducts];
      return;
    }

    this.products = this.cloneProducts.filter((product: any) => {
      return product.name.toLowerCase().includes(this.filtro!.toLowerCase());
    });
  }
}
