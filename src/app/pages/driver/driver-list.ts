import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { DriverService } from '../../services/driver.service';
import { Driver } from '../../models/driver';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './driver-list.html'
})
export class DriverListComponent implements OnInit {

  drivers: Driver[] = [];

  constructor(
    private driverService: DriverService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDrivers();

    // 🔥 ISSO RESOLVE SEU PROBLEMA
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadDrivers();
      });
  }

  loadDrivers() {
    this.drivers = this.driverService.getDrivers();
  }
}