import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterContentInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { debounceTime, filter, withLatestFrom } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../../../environments/environment';
import { AppState } from '../../../store/app-state';
import { MetricsService } from '../../metrics/services/metrics-service';
import { EventWatcherService } from './../../../core/event-watcher/event-watcher.service';
import { PageHeaderService } from './../../../core/page-header-service/page-header.service';
import { ChangeSideNavMode, CloseSideNav, OpenSideNav } from './../../../store/actions/dashboard-actions';
import { DashboardState } from './../../../store/reducers/dashboard-reducer';
import { SideNavItem } from './../side-nav/side-nav.component';

@Component({
  selector: 'app-dashboard-base',
  templateUrl: './dashboard-base.component.html',
  styleUrls: ['./dashboard-base.component.scss']
})

export class DashboardBaseComponent implements OnInit, OnDestroy, AfterContentInit {

  constructor(
    public pageHeaderService: PageHeaderService,
    private store: Store<AppState>,
    private eventWatcherService: EventWatcherService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private metricsService: MetricsService,
  ) {
    if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
      this.enableMobileNav();
    }
  }

  private openCloseSub: Subscription;
  private closeSub: Subscription;

  private fullView: boolean;

  private routeChangeSubscription: Subscription;

  private breakpointSub: Subscription;

  @ViewChild('sidenav') public sidenav: MatDrawer;

  sideNavTabs: SideNavItem[] = [
    {
      text: 'Dashboard',
      matIcon: 'assessment',
      link: '/dashboard',
      // Experimental - only show in development
      hidden: Observable.of(environment.production),
    },
    {
      text: 'Applications',
      matIcon: 'apps',
      link: '/applications'
    },
    {
      text: 'Services',
      matIcon: 'library_books',
      link: '/service-catalog'
    },
    {
      text: 'Cloud Foundry',
      matIcon: 'cloud',
      link: '/cloud-foundry'
    },
    {
      text: 'Endpoints',
      matIcon: 'settings_ethernet',
      link: '/endpoints'
    },
  ];

  sideNaveMode = 'side';

  ngOnInit() {
    const dashboardState$ = this.store.select('dashboard');
    this.fullView = this.isFullView(this.activatedRoute.snapshot);
    this.routeChangeSubscription = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      withLatestFrom(dashboardState$)
    ).subscribe(([event, dashboard]) => {
      this.fullView = this.isFullView(this.activatedRoute.snapshot);
      if (dashboard.sideNavMode === 'over' && dashboard.sidenavOpen) {
        this.sidenav.close();
      }
    });
  }

  ngOnDestroy() {
    this.routeChangeSubscription.unsubscribe();
    this.breakpointSub.unsubscribe();
    this.closeSub.unsubscribe();
    this.openCloseSub.unsubscribe();
  }

  isFullView(route: ActivatedRouteSnapshot): boolean {
    while (route.firstChild) {
      route = route.firstChild;
      if (route.data.uiFullView) {
        return true;
      }
    }
    return false;
  }

  ngAfterContentInit() {
    this.breakpointSub = this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ]).pipe(
      debounceTime(250)
    ).subscribe(result => {
      if (result.matches) {
        this.enableMobileNav();
      } else {
        this.disableMobileNav();
      }
    });

    this.closeSub = this.sidenav.onClose.subscribe(() => {
      this.store.dispatch(new CloseSideNav());
    });

    const dashboardState$ = this.store.select('dashboard');
    this.openCloseSub = dashboardState$
      .subscribe((dashboard: DashboardState) => {
        dashboard.sidenavOpen ? this.sidenav.open() : this.sidenav.close();
        this.sidenav.mode = dashboard.sideNavMode;
      });

  }

  private enableMobileNav() {
    this.store.dispatch(new CloseSideNav());
    this.store.dispatch(new ChangeSideNavMode('over'));
  }

  private disableMobileNav() {
    this.store.dispatch(new OpenSideNav());
    this.store.dispatch(new ChangeSideNavMode('side'));
  }
}
