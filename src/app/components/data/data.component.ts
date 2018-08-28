import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from '../../../../node_modules/rxjs';
import { resolve } from 'url';

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
      ]),
      // Validacion asincrona
      'username': new FormControl('', Validators.required, this.existeUsuario),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    });

    // Error con this.noIgual por que no sabe cual es el this.forma
    // this.forma.controls['password2'].setValidators([Validators.required, this.noIgual]);
    this.forma.controls['password2'].setValidators([Validators.required, this.noIgual.bind(this.forma)]);
    // this.forma.setValue(this.usuario);
  }

  noIgual(nombre: FormControl): {[s: string]: boolean} {
    // error por que no sabe cual es el this.forma
    /*
    if ( nombre.value !== this.forma.controls['password1'].value) {
      return {noigual: true};
    }
    */

    // ya se le envia el this.forma como this
    const forma: any = this;
    if ( nombre.value !== forma.controls['password1'].value) {
      return {noigual: true};
    }
    return null;
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

  /**
   * Validacion asincrona
   */
  existeUsuario(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout ( () => {
          if (control.value === 'Brayan') {
            resolve( {existe: true} );
          } else {
            resolve( null );
          }
        }, 3000);
      }
    );
    return promise;
  }
}
