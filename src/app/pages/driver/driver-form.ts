import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverService } from '../../services/driver.service';

@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './driver-form.html'
})
export class DriverFormComponent {

  driver = {
    id: 0,
    name: '',
    phone: ''
  };

  isEdit = false;

  constructor(
    private driverService: DriverService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = this.route.snapshot.params['id'];

    if (id) {
      const found = this.driverService.getDriverById(+id);
      if (found) {
        this.driver = { ...found };
        this.isEdit = true;
      }
    }
  }

  save() {
    if (this.isEdit) {
      this.driverService.updateDriver(this.driver);
    } else {
      this.driverService.addDriver(this.driver as any);
    }

    this.router.navigate(['/dashboard/drivers']);
  }
}