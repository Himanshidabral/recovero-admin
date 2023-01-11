import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/modules/alert/alert.service';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { USER_DETAIL_ROUTE } from '../../constants/route.constant';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { UserAddComponent } from '../user-add/user-add.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: any[];
  totalUser = 0;

  selectedFilter: any = 'all';
  deleted: boolean = false;

  public maxDate = new Date();

  columnToDisplay = [
    'sn',
    'image',
    'fullName',
    'email',
    'created_at',
  ];
  page = 1;
  limit = 10;
  sort = this.$userService.sort ? this.$userService.sort : '-created_at';
  search:any = '';
  sortDir = 'desc';
  fields = `profile_pic,first_name, last_name, country_code, mobile_no,created_at,email`;
  image_url:string=''
  isLoading = false;

  searchElement: HTMLElement;
  clear: number;
  constructor(
    private $userService: UserService,
    private $alert: AlertService,
    private $dialogService: DialogService,
    private $router: Router,
    private $dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }






  private getUserList(): void {
    this.isLoading = true;
    this.$userService
      .getUserList(
        this.page,
        this.limit,
        this.sort,
        this.search,
      )
      .subscribe(
        (data) => {
          console.log(data.data.user);
          this.users = data.data.user;
          this.totalUser = data.data.count;
          this.isLoading = false;
        },
        (err) => {
          this.isLoading = false;
        }
      );
  }

  onSearch(search: string): void {
    console.log('serch', search);
    this.page = 1;
    this.search = search;
    this.getUserList();
  }



  deletedUsers() {}

  pageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getUserList();
  }

  sortChange(sort: Sort): void {
    
    let sortBy = sort.active;
    if (sort.direction === 'asc') {
      this.sort = sortBy;
      this.sortDir = 'asc';
    } else if (sort.direction === 'desc') {
      this.sort = `-${sortBy}`;
      this.sortDir = 'desc';
    } else {
      return;
    }
    this.getUserList();
  }



  userDetails(_id: string) {
    this.$userService.sort = this.sort;
    this.$router.navigate([USER_DETAIL_ROUTE.url, _id]);
  }

  onFilterChange(event: any): void {
    const selectedValue = event.target.value;

    this.selectedFilter = selectedValue;

    if (this.selectedFilter === 'all') {
      this.deleted = false;
    }
    if (this.selectedFilter === 'deleted') {
      this.deleted = true;
    }

    this.getUserList();
  }

   addUser() {
    const dialogRef = this.$dialog.open(UserAddComponent, {
      height: 'auto',
      width: '50%',
      minWidth: '300px',
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe((add) => {
      if (add) {
        this.getUserList();
      }
    });
  }
}
