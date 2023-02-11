import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  alertModal(icon: SweetAlertIcon, title = '') {
    const Toast = Swal.mixin({
      background: "#1d1d1d",
      color: "#ffff",
      toast: true,
      position: 'bottom-start',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon,
      title
    })
  }

}
