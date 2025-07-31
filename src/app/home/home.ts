import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
