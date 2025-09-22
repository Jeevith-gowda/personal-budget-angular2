import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './menu/menu';
import { Hero } from './hero/hero';
import { Homepage } from './homepage/homepage';
import { Footer } from './footer/footer';
import { Article } from './article/article';
import { About } from './about/about';
import { Login } from './login/login';


@Component({
  selector: 'pb-root',
  imports: [RouterOutlet, Menu, Hero, Homepage, Footer, Article, About, Login],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('personal-budget2');
}
