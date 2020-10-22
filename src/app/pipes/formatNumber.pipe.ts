import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatNumber' })
export class FormatNumberPipe implements PipeTransform {
	transform(data: any, args: string[]): any {
		var value = data;

		if (value.length != 0) {
			value = parseInt(value, 10);
		}
		if (value.length <= 0) {
			value = parseInt('0');
		}

		value = data.toFixed(0);

		value = value + '';
		value = value.replace('.', '');

		var newValue = '';
		var valueArray = value.split('');
		for (var x = valueArray.length - 1; x >= 0; x--) {
			var valueNumber = newValue.replace(/\D/g, '');
			// var valueNumber = newValue;
			if (valueNumber.length % 3 == 0 && valueNumber.length != 0) {
				newValue = valueArray[x] + '.' + newValue;
			} else {
				newValue = valueArray[x] + '' + newValue;
			}
		}
		return newValue;
	}
}
