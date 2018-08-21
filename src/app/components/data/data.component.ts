import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  forma: FormGroup;
  usuario: Object = {
    nombreCompleto: {
      nombre: 'Brayan',
      apellido: 'Restrepo'
    },
    correo: 'Brayan2293@gmail.com'
  };

  constructor() { }

  ngOnInit() {
    this.forma = new FormGroup({
      'nombreCompleto': new FormGroup({
        'nombre': new FormControl('xxxx', [
          Validators.required,
          Validators.minLength(3)
        ]),
        'apellido': new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          this.noRestrepo
        ])
      }),
      'correo': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]),
      'pasatiempos': new FormArray([
        new FormControl('Correr', [
          Validators.required,
          Validators.minLength(3)
        ]
      )
      ])
    });
    //this.forma.setValue(this.usuario);
  }

  agregarPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('Otros 2', Validators.required)
    );
  }

  noRestrepo(nombre: FormControl): { [s: string]: boolean } {
    if (nombre.value === 'Restrepo') {
      return {norestrepo: true};
    }
    return null;
  }

  guargarCambio() {
    console.log( this.forma);
    this.forma.reset();
  }
}
