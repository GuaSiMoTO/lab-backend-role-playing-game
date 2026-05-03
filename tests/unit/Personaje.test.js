//Test 1 CalcularStats
const Personaje = require('../../src/classes/Personaje')

describe('Pruebas unitarias Personaje', () => {
    test('calcularStats() Debería asignar los valores correctos para un humano guerrero', () => {

        const datos = {
            id: 1,
            nombre: 'Aragorn',
            especie: 'humano',
            categoria: 'guerrero'
        };

        const p = new Personaje(datos);

        expect(p.vida).toBe(130);
        expect(p.ataque).toBe(25);
    });

    test('Deberia lanzar un error con especie o categoria', () => {
        const datosInvalidos = {
            nombre: 'Invalido',
            especie: 'orco',
            categoria: 'guerrero'
        };
        expect(() => new Personaje(datosInvalidos)).toThrow();
    })
})