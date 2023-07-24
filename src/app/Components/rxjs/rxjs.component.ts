import { Component } from '@angular/core';
import { Observable, catchError, concatMap, delay, forkJoin, from, last, map, mergeAll, mergeMap, of, switchMap, tap, toArray } from 'rxjs';
import { RxjsService } from 'src/app/Services/rxjs.service';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent {

  numbers: number[] = [2, 5, 6, 9, 8];

  constructor(private rxjsService: RxjsService) { }

  Ejecutar() {
    this.ObtenerData().pipe(
      tap(res => console.log(res)),
      switchMap(res => this.Sumar()),
      tap(res => console.log('hago otra cosa'))
    ).subscribe(res => {
      console.log('Subcribe', res)
    })

  }

  Sumar(): Observable<any> {
    //PRIMER EJEMPLO, SE UTILIZA EL MERGE MAP CON EL TOARRAY,
    //ESTO EJECUTA TODOS LOS OBSERVABLE EN PARALELO Y DEVUELVE TODO COMO UN SOLO OBSERVABLE


    // return from(this.numbers).pipe(
    //   mergeMap(res=>this.rxjsService.get(res).pipe(tap(res=>console.log('tapp observable interno',res)))),
    //   toArray(),
    //   tap(res=> console.log('tap interno',res))
    // )

    //SEGUNDO EJEMPLO, SE UTILIZA EL CANCAT MAP CON EL LAST,
    //ESTO EJECUTA TODOS LOS OBSERVABLE EN SECUENCIA Y DEVUELVE EL ULTIMO OBSERVABLE EMITIDO, SI NECESITA
    //QUE DEVUELVE TODO CAMBIA EL LAST POR EL TOARRAY

    // return from(this.numbers).pipe(
    //   concatMap(res=>this.rxjsService.get(res).pipe(tap(res=>console.log('tapp observable interno',res)))),
    //   last(),
    //   tap(res=> console.log('tap interno',res))
    // )

    //TERCER  EJEMPLO, SE UTILIZA EL CANCAT MAP CON EL LAST,
    //ESTO EJECUTA TODOS LOS OBSERVABLE EN PARALELO Y DEVUELVE TODO LOS OBSERVBLES EMITIDO, SI NECESITA
    //SE UTILIZA EL CATCHERROR PARA QUE SI UNO FALLA NO AFECTE A LOS DEMAS

    const fromData$ = this.numbers.map(res => this.rxjsService.get(res)
      .pipe(
        catchError(error => of(null))
      )
    );

    return forkJoin(fromData$).pipe(
      tap(res => console.log('tap interno', res))
    )

    // return from(this.numbers).pipe(
    //   mergeMap(res=>this.rxjsService.get(res).pipe(tap(res=>console.log('tapp observable interno',res)))),
    //   //last(),
    //   toArray(),
    //   tap(res=> console.log('tap interno',res))
    // )
  }

  ObtenerData(): Observable<string> {
    return of('Ejecucion a la api').pipe(
      map(res => res)
    )
  }
}
