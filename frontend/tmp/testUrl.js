const phone='917667456367';
const message='Hello! How are you?';
const url = `https://wa.me/${phone.replace(/\\D/g,'')}?text=${encodeURIComponent(message)}`;
console.log(url);
