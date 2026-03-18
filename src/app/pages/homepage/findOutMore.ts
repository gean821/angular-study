import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

interface BenefitItem {
  title: string;
  text: string;
}

interface StepItem {
  step: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-find-out-more',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './findOutMore.html',
})
export class FindOutMore {

  benefits: BenefitItem[] = [
    {
      title: 'Agendamento Inteligente',
      text: 'Organize horários de carga e descarga com mais eficiência, evitando conflitos e reduzindo atrasos.',
    },
    {
      title: 'Controle de Pátio',
      text: 'Visualize a movimentação dos veículos em tempo real e melhore o fluxo operacional da sua empresa.',
    },
    {
      title: 'Redução de Filas',
      text: 'Diminua o tempo de espera dos caminhões e aumente a produtividade das docas.',
    },
    {
      title: 'Gestão Centralizada',
      text: 'Acompanhe motoristas, transportadoras, horários e operações em um único sistema.',
    },
    {
      title: 'Mais Produtividade',
      text: 'Com processos mais organizados, sua equipe ganha velocidade e reduz retrabalho.',
    },
    {
      title: 'Decisões com Dados',
      text: 'Tenha uma visão clara da operação para identificar gargalos e melhorar resultados.',
    },
  ];

  steps: StepItem[] = [
    {
      step: '01',
      title: 'Cadastre sua empresa',
      text: 'Crie sua conta e configure os dados iniciais da sua operação logística.',
    },
    {
      step: '02',
      title: 'Organize docas e horários',
      text: 'Defina a disponibilidade das docas e estruture os agendamentos com facilidade.',
    },
    {
      step: '03',
      title: 'Acompanhe a operação',
      text: 'Monitore cargas, descargas e movimentações com muito mais controle.',
    },
  ];

  diferencial: string[] = [
    'Interface moderna e intuitiva',
    'Redução de gargalos operacionais',
    'Melhor comunicação entre empresa e transportadora',
    'Mais previsibilidade no fluxo logístico',
  ];
}