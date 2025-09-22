import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pb-hero',
  imports: [RouterLink],  // Add RouterLink here
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {

}
