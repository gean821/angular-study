import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NgFor, MatButtonModule, RouterLink],
  templateUrl: './homepage.html',
})
export class Homepage {

  features = [
    {
      icon: 'calendar_today',
      title: '1. Agende Online',
      text: 'Fornecedores e transportadoras escolhem os melhores horários conforme a disponibilidade das docas.'
    },
    {
      icon: 'dashboard',
      title: '2. Monitoramento Real',
      text: 'Painel de controle unificado para portaria e operação.'
    },
    {
      icon: 'bolt',
      title: '3. Eficiência Total',
      text: 'Reduza o tempo de espera e organize o fluxo de pátio.'
    }
  ];
}