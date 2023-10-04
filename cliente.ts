import Persona from "./Persona";
import Paciente from "./Paciente";

export default class Cliente extends Persona{
    private numVisitas: number = 0;
    private pacientes : Paciente[] = [];
    private pacienteSeleccionado : Paciente | null = null;

    constructor(nombre : string, telefono : string, pacientes : Persona[]){
        super(nombre, telefono);
        this.id = this.generarIDUnico(pacientes);
    }

    private generarIDUnico(pacientes : Persona[]) : number{
        let noEsta : boolean = false;
        let nuevoID : number = 0;

        while (!noEsta){
            nuevoID = Math.floor(Math.random() * 100000) + 1;
            let estaID = false;

            for (let i = 0; i < pacientes.length; i++){
                if (pacientes[i].getId() === nuevoID){
                    estaID = true;
                    break;
                }
            }

            if (!estaID){
                noEsta = true;
            }
        }
        return nuevoID;
    }

    getObtenerIDUnico() : number{
        return this.id;
    }

    getNumVisitas() : number{
        return this.numVisitas;
    }
    
    public incrementarVisita(){
        this.numVisitas++;
    }

    public seleccionarPaciente(paciente : Paciente) : void{
        this.pacienteSeleccionado = paciente;
        console.log(`Paciente "${paciente.getNombre()}" seleccionado.`);
    }

    getPacientes() : Paciente[]{
        return this.pacientes;
    }

    setPaciente(paciente : Paciente) : void{
        this.pacientes.push(paciente);
    }

    getPacienteSeleccionado(): Paciente | null{
        return this.pacienteSeleccionado;
    }
    
    setPacienteSeleccionado(paciente : Paciente | null) : void{
        this.pacienteSeleccionado = paciente;
    }

    public eliminarPaciente(paciente : Paciente) : void{
        let index = this.pacientes.indexOf(paciente);
        if (index !== -1){
            this.pacientes.splice(index, 1);
        }
    }
}