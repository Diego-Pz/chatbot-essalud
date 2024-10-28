import { Component, Input } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { BtnStyles } from './btn-styles.model';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss']
})
export class BtnComponent {

  @Input() disabled = false;
  @Input() loading = false;
  @Input() typeBtn: 'reset' | 'submit' | 'button' = 'button';
  @Input() color: BtnStyles = 'primary';
  @Input() style = {};
  faSpinner = faSpinner;

  mapColors = {
    success: {
      'bg-success-700': true,
      'hover:bg-success-800': true,
      'focus:ring-success-300': true,
      'text-white': true,
    },
    primary: {
      'bg-primary-700': true,
      'hover:bg-primary-800': true,
      'focus:ring-primary-300': true,
      'text-white': true,
    },
    danger: {
      'bg-red-700': true,
      'hover:bg-red-800': true,
      'focus:ring-red-300': true,
      'text-white': true,
    },
    light: {
      'bg-gray-200': true,
      'hover:bg-gray-500': true,
      'focus:ring-gray-50': true,
      'text-gray-700': true,
    },
    cancel: {
      'bg-gray-200': true,
      'hover:bg-gray-300': true,
      'focus:ring-gray-50': true,
      'text-gray-700': true,
    },
    white: {
      'bg-white': true,
      'hover:bg-gray-100': true,
      'ring-gray-50': true,
      'text-gray-700': true,
    },
    sky: {
      'bg-green-600': true,
      'hover:bg-green-700': true,
      'focus:ring-green-300': true,
      'text-white': true,
    },
    mezclado: {
      'bg-sigps': true,
      'text-white': true,
    },
    transparente: {
      'bg-transparent': true,
      'text-Name': true,
      'border-[var(--color-base)]': true,
      'border-[0.0125rem]': true,
      'hover:bg-gray-500': true,
      'focus:ring-gray-500': true,
    },
    transparenteCancel: {
      'bg-transparent': true,
      'text-red-500': true,
      'border-red-500': true,
      'border-[0.0125rem]': true,
      'hover:bg-gray-100': true,
      'focus:ring-gray-100': true,
    },
    btnEvaluacion: {
      'text-[var(--color-black-alt)]': true,
      'bg-[var(--color-pag-claro)]': true,
      'hover:bg-[var(--color-base-claro)]': true,
      'hover:text-white': true
    },
    btnEvaluacionWhite: {
      'bg-white': true,
      'text-[var(--color-evaluacion-btn)]': true,
      'border-[var(--color-evaluacion-btn)]': true,
      'border-[0.0125rem]': true,
      'hover:bg-gray-300': true,
    },
    bordeado: {
      'bg-white': true,
      'text-[var(--color-black-alt)]': true,
      'border-[var(--color-a-degrade)]': true,
      '!px-10': true,
      'border-[0.0125rem]': true,
      'hover:bg-gray-200': true,
      'focus:ring-gray-500': true,
    },
    base: {
      'text-[#F5F5F5]': true,
      'bg-[var(--color-base-claro)]': true,
      'hover:bg-[#2777a9]': true
    },
    none:{}
  };

  constructor() {}

  get colors() {
    let colors = this.mapColors[this.color];
    if (this.color != "none") {
      if (colors) {
        colors = {...colors,...this.style}
        if(this.disabled) colors = {...colors, ...{'opacity-50': true}};
        return colors;
      }
    }
    return this.style;
  }


}
