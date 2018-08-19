import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  public usuario: Object = {
    nombre: null,
    apellido: 'Restrepo',
    correo: '',
    pais: 'co',
    acepta: true,
    sexo: 'Hombre'
  };
  paises = [
    {
      codigo: 'co',
      nombre: 'Colombia'
    },
    {
      codigo: 've',
      nombre: 'Venezuela'
    }
  ];

  sexos: string[] = ['Hombre', 'Mujer'];

  constructor() { }

  ngOnInit() {
  }

  guardar(forma: NgForm) {
    console.log(forma);
    console.log(this.usuario);
    console.log(forma.value);
    console.log(forma.valid);
  }
}
