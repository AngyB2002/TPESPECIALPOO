import Persona from "./Persona";
import Paciente from "./Paciente";

export default class Cliente extends Persona{
    private esVIP : boolean;
    private numVisitas : number;
    private pacientes : Paciente[] = [];
    private pacienteSeleccionado : Paciente | null = null;

    constructor(nombre : string, telefono : string, pacientes : Persona[]){
        super(nombre, telefono);
        this.id = this.generarIDUnico(pacientes);
        this.esVIP = false;
        this.numVisitas = 0;
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
        return this.generarIDUnico([]);
    }

    incrementarVisita(){
        this.numVisitas++;
        if (this.numVisitas >= 5){
            this.esVIP = true;
        }
    }

    esClienteVIP() : boolean{
        return this.esVIP;
    }

    public seleccionarPaciente(paciente : Paciente) : void{
        this.pacienteSeleccionado = paciente;
        console.log(`Proveedor "${paciente.getNombre()}" seleccionado.`);
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
}