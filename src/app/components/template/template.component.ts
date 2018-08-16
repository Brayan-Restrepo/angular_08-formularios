import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  public usuario: Object = {
    nombre: 'Brayan',
    apellido: 'Restrepo',
    correo: ''
  };

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
