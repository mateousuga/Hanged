
let words = ['COMPUTADORA', 'PALABRA', 'AMOR', 'UNIVERSIDAD', 'PROGRAMACION', 'CARRERA', 'SISTEMAS', 'INFORMACION', 'TECNOLOGIA', 'INFORMACION']

export function getWords() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}