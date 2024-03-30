import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output() filterProducts = new EventEmitter<string>();
  @Input() categorias?:any[];


  constructor() { }

  ngOnInit(): void {
    console.log(this.categorias)
    const sidebarLinks = document.querySelector('.sidebar-links') as HTMLElement;
    const scrollUpBtn = document.getElementById('scrollUpBtn') as HTMLElement;
    const scrollDownBtn = document.getElementById('scrollDownBtn') as HTMLElement;

    sidebarLinks.addEventListener('scroll', () => {
      this.toggleScrollButtons(sidebarLinks, scrollUpBtn, scrollDownBtn);
    });

    scrollUpBtn.addEventListener('click', () => {
      sidebarLinks.scrollTop -= 50; // Ajuste a quantidade de rolagem conforme necessário
      this.toggleScrollButtons(sidebarLinks, scrollUpBtn, scrollDownBtn);
    });

    scrollDownBtn.addEventListener('click', () => {
      sidebarLinks.scrollTop += 50; // Ajuste a quantidade de rolagem conforme necessário
      this.toggleScrollButtons(sidebarLinks, scrollUpBtn, scrollDownBtn);
    });
  }

  toggleScrollButtons(sidebarLinks: HTMLElement, scrollUpBtn: HTMLElement, scrollDownBtn: HTMLElement): void {
    if (sidebarLinks.scrollTop > 0) {
      scrollUpBtn.style.display = 'block';
    } else {
      scrollUpBtn.style.display = 'none';
    }

    if (sidebarLinks.scrollTop < (sidebarLinks.scrollHeight - sidebarLinks.clientHeight)) {
      scrollDownBtn.style.display = 'block';
    } else {
      scrollDownBtn.style.display = 'none';
    }
  }

}
