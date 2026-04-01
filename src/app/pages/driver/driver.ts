import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-drivers',
    standalone: true,
    imports:  [RouterLink],
    templateUrl: './driver.html',
})
export class Driver {
    constructor() { }
} 
