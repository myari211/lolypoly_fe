// currencyHelper.js

export const formatRupiah = (angka) => {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, // Bisa disesuaikan sesuai kebutuhan
    });

    return formatter.format(angka);
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit',
    }).format(date);
  };
