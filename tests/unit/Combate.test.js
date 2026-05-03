// Test 1 Simular
const Combate = require('../../src/classes/Combate');

describe('Pruebas unitarias de Combate', () => {
    test('simular() devuelve al ganador correcto en un caso predecible', () => {
        // Personaje A: Muy fuerte
        const fichaFuerte = {
            id: 1,
            nombre: 'Super Guerrero',
            especie: 'enano',
            categoria: 'guerrero'
        };

        // Personaje B: Muy débil (Un elfo mago tiene poca vida base)
        const fichaDebil = {
            id: 2,
            nombre: 'Mago Débil',
            especie: 'elfo',
            categoria: 'mago'
        };

        const resultado = Combate.simular(fichaFuerte, fichaDebil);

        // Verificaciones
        expect(resultado).toHaveProperty('ganador');
        expect(resultado).toHaveProperty('log');
        expect(Array.isArray(resultado.log)).toBe(true);
        
        // En este duelo, el Guerrero (con mucha vida y ataque) debería ganar al Mago
        expect(resultado.ganador).toBe('Super Guerrero');
        expect(resultado.perdedor).toBe('Mago Débil');
    });
});