// currencyHelper.js

export const formatRupiah = (angka) => {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, // Bisa disesuaikan sesuai kebutuhan
    });

    return formatter.format(angka);
};
