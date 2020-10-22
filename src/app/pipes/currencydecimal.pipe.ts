import { Pipe, PipeTransform, Directive, Input, Inject, HostListener, ElementRef, OnInit } from "@angular/core";
//const PADDING = "000000";
@Pipe({ name: "currencydecimal" })
export class CurrencyDecimalPipe implements PipeTransform {
  transform(value: any, fractionSize = 2, args: string[]): any {
    var clean = value;
    // let  fractionSize= 0;
    try {
      // console.log(value);
      clean = value + "";
      //throw new RangeError();
      //clean = value.replace(/[^-0-9\.]/g, '');
      var negativeCheck = clean.split('-');
      var decimalCheck = clean.split(',');

      if (negativeCheck[1] != undefined) {
        negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
        clean = negativeCheck[0] + '-' + negativeCheck[1];
        if (negativeCheck[0].length > 0) {
          clean = negativeCheck[0];
        }

      }
      if (decimalCheck[1] != undefined) {
        if (fractionSize > 0) {
          decimalCheck[1] = decimalCheck[1].slice(0, fractionSize);
          clean = decimalCheck[0] + ',' + decimalCheck[1];
        } else {
          clean = decimalCheck[0];
        }
      }

    }
    catch (e) {
      console.log(e);
      if (e instanceof RangeError) {
        console.log('out of range');
      }
    }

    return clean;
  }

  parse(value: string, fractionSize: number = 2): string {

    var clean = value.replace(/[^-0-9\.]/g, '');
    var negativeCheck = clean.split('-');
    var decimalCheck = clean.split('.');

    if (negativeCheck[1] != undefined) {
      negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
      clean = negativeCheck[0] + '-' + negativeCheck[1];
      if (negativeCheck[0].length > 0) {
        clean = negativeCheck[0];
      }

    }
    if (decimalCheck[1] != undefined) {

      if (fractionSize > 0) {
        decimalCheck[1] = decimalCheck[1].slice(0, fractionSize);
        clean = decimalCheck[0] + '.' + decimalCheck[1];
      } else {
        clean = decimalCheck[0];
      }

    }

    return clean;
  }

}
