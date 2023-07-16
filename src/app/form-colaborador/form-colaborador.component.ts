import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';

@Component({
  selector: 'app-form-colaborador',
  templateUrl: './form-colaborador.component.html',
  styleUrls: ['./form-colaborador.component.scss'],
})
export class FormColaboradorComponent  implements OnInit {

  colaboradores: any[] = [];    
  campoEquipe: boolean = false;
  avatarMasculino = '../../assets/avatar/avatarmasculino.jpg'  
  avatarFeminino = '../../assets/avatar/avatarfeminino.jpg'


  formulario = this._fb.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],    
    celular: ['', Validators.required],
    descricao: ['', Validators.required],
    endereco: ['', Validators.required],
    idade: ['', Validators.required],
    sexo: ['', Validators.required],  
    equipe: [false],
    nomeEquipe: [''],
    imagem: ['']
  });

  readonly celularMascara: MaskitoOptions = {
    mask: ['(', /\d/, /\d/, ')', ' ', /\d/ ,/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  constructor(
    private _fb: FormBuilder,    
  ) {}

  ngOnInit() {

    this.formulario.get('equipe')?.valueChanges
        .subscribe((data) => {          
          if(data) {
            this.campoEquipe = true;
            this.formulario.get('nomeEquipe')?.setValidators(Validators.required);
            this.formulario.get('nomeEquipe')?.updateValueAndValidity();
          } else {
            this.campoEquipe = false;
            this.formulario.get('nomeEquipe')?.clearValidators();
            this.formulario.get('nomeEquipe')?.updateValueAndValidity();
          }              
        });
  }

  definirImagemColaborador(): void {
    const sexo = this.formulario.get('sexo')?.value;

    if (sexo == 'F') {
      this.formulario.get('imagem')?.setValue(this.avatarFeminino);      
    } else {
      this.formulario.get('imagem')?.setValue(this.avatarMasculino);      
    }
  }  

  salvarColaborador(): void {
    this.definirImagemColaborador();

    let colaborador;  
    colaborador = this.formulario.getRawValue();        
    this.colaboradores.push(colaborador);
    
    sessionStorage.setItem('colaboradores',  JSON.stringify(this.colaboradores));
    this.limparForm();
  }

  limparForm(): void {
    this.formulario.reset();
  }

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();
}
