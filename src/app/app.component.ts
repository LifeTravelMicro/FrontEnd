import { Component } from '@angular/core';
import { routes } from './app-routing.module';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	routes = routes;

	capitalize(text: string) {
		return text?.charAt(0)?.toUpperCase() + text?.slice(1);
	}
}
