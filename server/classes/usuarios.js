class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {

        let persona = {
            id,
            nombre,
            sala
        }

        this.personas.push(persona);

        return this.personas;

    }

    getPersona(id) {
        /**
         * El método de los arrays, filtra los resultados a partir de una condición, en este caso que el id sea el que le pasamos
         * Devuelve siempre otro array, por eso al final está [0], porque al buscar por índice solo devuelve un registro
         * Se puede hacer de ambas maneras:
         */
        let persona = this.personas.filter(persona => persona.id === id)[0];
        /* let persona = this.personas.filter(persona => {
            return persona.id = id
        })[0]; */

        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);

        return personasEnSala;
    }

    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);

        // Aquí se filtra, devolviendo el mismo array sin la persona que ha encontrado por id
        this.personas = this.personas.filter(persona => persona.id != id);

        return personaBorrada;
    }

}

module.exports = {
    Usuarios
}