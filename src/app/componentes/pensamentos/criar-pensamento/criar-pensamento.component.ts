import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { minusculoValidator } from './minusculoValidator';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css'],
})
export class CriarPensamentoComponent implements OnInit {
  formulario: FormGroup = this.formBuilder.group({
    conteudo: [
      '',
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
    autoria: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        minusculoValidator,
      ]),
    ],
    modelo: ['modelo1'],
  });

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  criarPensamento() {
    console.log(this.formulario.get('autoria')?.errors);

    if (this.formulario.valid) {
      this.service.criarPensamento(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao() {
    if (this.formulario.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}
