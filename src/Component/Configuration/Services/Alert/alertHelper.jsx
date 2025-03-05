import Swal from 'sweetalert2';

export const ModalPopUp = (text, icon) => {
    let formattedMessages;

    if(typeof text === 'string') {
        formattedMessages = `<span>${text}</span>`;
    }
    else if (typeof text === 'object') {
        // formattedMessages =  Object.values(text).flat().join(' ');
        const listItems = Object.values(text).flat().map(text => `<li>${text}</li>`).join('');
        formattedMessages = `<ul>${listItems}</ul>`;
    }
    else {
        formattedMessages = '<span>An unexpected error occurred.</span>';
    }

    return Swal.fire({
        toast: true, //true will be toast, false will be modal
        position: 'top-end',
        showConfirmButton: false,
        html: formattedMessages,
        timer: 10000, //10s
        timerProgressBar: true,
        icon: icon, // success, error, warning, info, question
    });
}