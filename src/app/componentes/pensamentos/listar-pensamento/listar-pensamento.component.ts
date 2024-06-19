import { Component, OnInit } from '@angular/core';
import { IPensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: IPensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;

  constructor(private servcice: PensamentoService) {}

  ngOnInit(): void {
    this.servcice.listar(this.paginaAtual).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos;
    });
  }

  cerregarMaisPensamentos() {
    this.servcice.listar(++this.paginaAtual).subscribe((listaPensamentos) => {
      this.listaPensamentos.push(...listaPensamentos);
      if (!this.listaPensamentos.length) {
        this.haMaisPensamentos = false;
      }
    });
  }
}
