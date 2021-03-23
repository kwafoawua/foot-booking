import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { environment } from '../../../environments/environment';
import {Router} from '@angular/router';
import { AuthService } from '../../_services';



@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class AdminLayoutComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  uploadsUrl = environment.uploadsBaseURL;
  profileData: any;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    public auth: AuthService
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 769px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.profileData = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }



}
