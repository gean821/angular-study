import { Component } from '@angular/core';
import { NgFor, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [NgFor, TitleCasePipe, RouterLink],
  templateUrl: './dashboard-overview.html',
})
export class DashboardOverview {

  stats = [
    { icon: 'calendar_today', label: 'Agendamentos hoje',   value: '0',   trend: 0,  color: '#60a5fa' },
    { icon: 'local_shipping', label: 'Veículos no pátio',   value: '0',    trend: 0,  color: '#34d399' },
    { icon: 'warehouse',      label: 'Docas disponíveis',   value: '0/0',  trend: 0,   color: '#fbbf24' },
    { icon: 'business',       label: 'Fornecedores ativos', value: '0',  trend: 0,   color: '#a78bfa' },
  ];
}