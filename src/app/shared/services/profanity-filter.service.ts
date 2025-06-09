import { Injectable } from '@angular/core';
import { Filter } from 'bad-words';

@Injectable({
  providedIn: 'root'
})
export class ProfanityFilterService {
  private filter: Filter;

  constructor() {
    this.filter = new Filter();
    // Lista de palavras proibidas em português
    this.filter.addWords(
      // Palavrões comuns
      'caralho', 'porra', 'puta', 'merda', 'cacete', 'caramba', 'porcaria',
      'bosta', 'caceta', 'carai', 'caramba', 'caralho', 'cacete', 'caceta',
      'carai', 'caramba', 'caralho', 'cacete', 'caceta', 'carai', 'caramba',
      
      // Variações com números
      'c4ralho', 'p0rra', 'p1ta', 'm3rda', 'c4cete', 'c4ramba', 'p0rcaria',
      'b0sta', 'c4ceta', 'c4rai', 'c4ramba', 'c4ralho', 'c4cete', 'c4ceta',
      
      // Variações com caracteres especiais
      'c@ralho', 'p@rra', 'p@ta', 'm@rda', 'c@cete', 'c@ramba', 'p@rcaria',
      'b@sta', 'c@ceta', 'c@rai', 'c@ramba', 'c@ralho', 'c@cete', 'c@ceta',
      
      // Variações com espaços
      'c a r a l h o', 'p o r r a', 'p u t a', 'm e r d a', 'c a c e t e',
      'c a r a m b a', 'p o r c a r i a', 'b o s t a', 'c a c e t a',
      
      // Variações com acentos
      'cárálhó', 'pórrá', 'pútá', 'mérdá', 'cácété', 'cárámbá', 'pórcáriá',
      'bóstá', 'cácétá', 'cárái', 'cárámbá', 'cárálhó', 'cácété', 'cácétá',
      
      // Variações com letras repetidas
      'caaralho', 'pooorra', 'puuuta', 'meerda', 'caacete', 'caaramba',
      'pooorcaria', 'boosta', 'caaceta', 'caarai', 'caaramba', 'caaralho',
      
      // Variações com hífens
      'c-a-r-a-l-h-o', 'p-o-r-r-a', 'p-u-t-a', 'm-e-r-d-a', 'c-a-c-e-t-e',
      'c-a-r-a-m-b-a', 'p-o-r-c-a-r-i-a', 'b-o-s-t-a', 'c-a-c-e-t-a',
      
      // Variações com underscores
      'c_a_r_a_l_h_o', 'p_o_r_r_a', 'p_u_t_a', 'm_e_r_d_a', 'c_a_c_e_t_e',
      'c_a_r_a_m_b_a', 'p_o_r_c_a_r_i_a', 'b_o_s_t_a', 'c_a_c_e_t_a',
      
      // Variações com pontos
      'c.a.r.a.l.h.o', 'p.o.r.r.a', 'p.u.t.a', 'm.e.r.d.a', 'c.a.c.e.t.e',
      'c.a.r.a.m.b.a', 'p.o.r.c.a.r.i.a', 'b.o.s.t.a', 'c.a.c.e.t.a',
      
      // Variações com asteriscos
      'c*a*r*a*l*h*o', 'p*o*r*r*a', 'p*u*t*a', 'm*e*r*d*a', 'c*a*c*e*t*e',
      'c*a*r*a*m*b*a', 'p*o*r*c*a*r*i*a', 'b*o*s*t*a', 'c*a*c*e*t*a',
      
      // Variações com letras maiúsculas e minúsculas
      'CaRaLhO', 'PoRrA', 'PuTa', 'MeRdA', 'CaCeTe', 'CaRaMbA', 'PoRcArIa',
      'BoStA', 'CaCeTa', 'CaRaI', 'CaRaMbA', 'CaRaLhO', 'CaCeTe', 'CaCeTa',
      
      // Variações com leetspeak
      'c4r4lh0', 'p0rr4', 'pvt4', 'm3rd4', 'c4c3t3', 'c4r4mb4', 'p0rc4r14',
      'b0st4', 'c4c3t4', 'c4r41', 'c4r4mb4', 'c4r4lh0', 'c4c3t3', 'c4c3t4'
    );
  }

  containsProfanity(text: string): boolean {
    return this.filter.isProfane(text);
  }
} 