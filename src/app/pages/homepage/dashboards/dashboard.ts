import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/dashboard':           { title: 'Visão Geral',    subtitle: 'Resumo das operações do dia' },
  '/dashboard/schedule':  { title: 'Agendamentos',   subtitle: 'Gerencie os agendamentos de carga e descarga' },
  '/dashboard/docks':     { title: 'Docas',           subtitle: 'Controle a disponibilidade das docas' },
  '/dashboard/suppliers': { title: 'Fornecedores',   subtitle: 'Cadastre e gerencie fornecedores' },
  '/dashboard/drivers':   { title: 'Motoristas',     subtitle: 'Cadastre e gerencie motoristas' },
  '/dashboard/vehicles':  { title: 'Veículos',       subtitle: 'Cadastre e gerencie a frota' },
  '/dashboard/reports':   { title: 'Relatórios',     subtitle: 'Análise de desempenho operacional' },
  '/dashboard/settings':  { title: 'Configurações',  subtitle: 'Ajuste as preferências do sistema' },
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
})
export class Dashboard {

  pageTitle = 'Visão Geral';
  pageSubtitle = 'Resumo das operações do dia';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const page = PAGE_TITLES[e.urlAfterRedirects] ?? { title: 'Dashboard', subtitle: '' };
        this.pageTitle = page.title;
        this.pageSubtitle = page.subtitle;
      });
  }
}