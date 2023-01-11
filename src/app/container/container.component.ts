import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CHANGE_PASSWORD_ROUTE, DASHBOARD_ROUTE, DECK_ROUTE, LOGIN_ROUTE, POINT_ROUTE, PROPERTY_ROUTE, TIME_ROUTE, USER_ROUTE,CATEGORY_ROUTE, BRAND_ROUTE, PRODUCT_ROUTE, CMS_ROUTE, ORDERS_ROUTE, COMMISSION_ROUTE, REVIEW_ROUTE, REPORT_ROUTE, TRANSACTION_ROUTE } from '../constants/route.constants';
import { DialogService } from '../modules/dialog/service/dialog.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, AfterViewInit {

  dashboardRoute = DASHBOARD_ROUTE;
  userRoute = USER_ROUTE;
  categoryRoute = CATEGORY_ROUTE;
  changePasswordRoute = CHANGE_PASSWORD_ROUTE;
  deckRoute =  DECK_ROUTE;
  pointsRoute = POINT_ROUTE;
  timeRoute = TIME_ROUTE;
  brandRoute = BRAND_ROUTE
  productRoute = PRODUCT_ROUTE;
  cmsRoute = CMS_ROUTE;
  orderRoute = ORDERS_ROUTE;
  commisionRoute = COMMISSION_ROUTE;
  reviewRoute = REVIEW_ROUTE;
  reportRoute = REPORT_ROUTE;
  transactionRoute = TRANSACTION_ROUTE

  mode :any= 'side';
  opened = true;
  role:any=1;

  isLoading = false;
  isHandset = new BehaviorSubject<boolean>(false);
  @ViewChild('drawer') drawer: MatDrawer;
  constructor(
    private $loader: LoadingService,
    private $router: Router,
    private $dialogService: DialogService,
    private $activatedRoute: ActivatedRoute
  ) {
    if (window.innerWidth < 980) {
      this.isHandset.next(true);
    }
    fromEvent(window, 'resize').subscribe(data => {
      if (window.innerWidth < 980) {
        this.isHandset.next(true);
      } else {
        this.isHandset.next(false);
      }
    });
  }

  ngOnInit(): void {
     this.role= localStorage.getItem('adminType');

  }

  ngAfterViewInit(): void {
    this.isHandset
      .pipe(
        delay(0)
      )
      .subscribe((data) => {
        if (data) {
          this.mode = 'over';
          this.opened = false;
        } else {
          this.mode = 'side';
          this.opened = true;
        }
      });
  }

  onClickRoomzLogo(): void {
    if (this.mode === 'over') {
      this.drawer.toggle();
    }
  }


  logOut(): void {
    this.$dialogService.confirm((status:any) => {
        if (status) {
          localStorage.removeItem('adminAccessToken');
          this.$router.navigateByUrl(LOGIN_ROUTE.url);
        }
      },
      'Are you sure?'
    );
  }

}
