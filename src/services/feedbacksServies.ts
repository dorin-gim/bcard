import Swal from "sweetalert2";


export function showSuccessMessage(message: string){
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message
    })
}

export function showErrorMessage(message: string){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
    })
}

export function showDeleteMessage(message: string){
    Swal.fire({
        title: 'Are you sure?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    })
}