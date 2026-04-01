import { Injectable } from '@angular/core';
import { Driver } from '../models/driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private storageKey = 'drivers';

  getDrivers(): Driver[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveDrivers(drivers: Driver[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(drivers));
  }

  addDriver(driver: Driver) {
    const drivers = this.getDrivers();
    driver.id = Date.now();
    drivers.push(driver);
    this.saveDrivers(drivers);
  }

  getDriverById(id: number) {
    return this.getDrivers().find(d => d.id === id);
  }

  updateDriver(updated: Driver) {
    const drivers = this.getDrivers();
    const index = drivers.findIndex(d => d.id === updated.id);

    if (index !== -1) {
      drivers[index] = updated;
      this.saveDrivers(drivers);
    }
  }
}