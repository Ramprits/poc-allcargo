import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Schedule, Country } from './schedule.model';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  countries: Country[] = [];
  isLoading = false;
  ELEMENT_DATA: Schedule[] = [];
  searchForm: FormGroup;
  dataSource = new MatTableDataSource<Schedule>(this.ELEMENT_DATA);
  displayedColumns: string[] = ['id', 'voyageNumber', 'productType', 'cutOff', 'cutOffIMO', 'placeOfReceipt.name'];

  constructor(private homeService: HomeService, private fb: FormBuilder) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.homeService.getCountries().subscribe((countries) => (this.countries = countries as Country[]));
    this.homeService.getSchedules().subscribe((schedule) => (this.dataSource.data = schedule as Schedule[]));
    this.buildSearchForm();
  }
  buildSearchForm() {
    this.searchForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get searchFormControl() {
    return this.searchForm.controls;
  }
  onSearch() {
    if (this.searchForm.valid) {
      this.isLoading = true;
      const { from, to } = this.searchForm.value;

      this.homeService.getSchedules(from.code, to.code).subscribe(
        (schedule) => (this.dataSource.data = schedule as Schedule[]),
        (err) => {
          console.error(err.message);
        },
        () => {
          this.isLoading = false;
        }
      );
    }
  }
}
