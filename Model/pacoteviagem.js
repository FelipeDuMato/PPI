import PacoteViagemDB from "../DB/pacoteviagemDB.js";

export default class PacoteViagem {
    
    #id;
    #destino;
    #idioma;
    #moeda;
    #fusoHorario;
    #ida;
    #volta;
    #preco;

    constructor(id, destino, idioma, moeda, fusoHorario, ida, volta, preco){
        this.#id = id;
        this.#destino = destino;
        this.#idioma = idioma;
        this.#moeda = moeda;
        this.#fusoHorario = fusoHorario;
        this.#ida = ida;
        this.#volta = volta;
        this.#preco = preco;
    }

    // Gets
    get id(){
        return this.#id;
    }
    get destino(){
        return this.#destino;
    }
    get idioma(){
        return this.#idioma;
    }
    get moeda(){
        return this.#moeda;
    }
    get fusoHorario(){
        return this.#fusoHorario;
    }
    get ida(){
        return this.#ida;
    }
    get volta(){
        return this.#volta;
    }
    get preco(){
        return this.#preco;
    }

    // Sets
    set id(novoId){
        this.#id = novoId;
    }
    set destino(novoDestino){
        this.#destino = novoDestino;
    }
    set idioma(novoIdioma){
        this.#idioma = novoIdioma;
    }    
    set moeda(novaMoeda){
        this.#moeda = novaMoeda;
    }
    set fusoHorario(novoFusoHorario){
        this.#fusoHorario = novoFusoHorario;
    }
    set ida(novaIda){
        this.#ida = novaIda;
    }
    set volta(novaVolta){
        this.#volta = novaVolta;
    }
    set preco(novoPreco){
        this.#preco = novoPreco;
    }

    //Métodos
    toJSON(){
        return {
            'id': this.#id,
            'destino': this.#destino,
            'idioma': this.#idioma,
            'moeda': this.#moeda,
            'fusoHorario': this.#fusoHorario,
            'ida': this.#ida,
            'volta': this.#volta,
            'preco': this.#preco
        }
    }

    async gravar(){
        const pacoDB = new PacoteViagemDB();
        pacoDB.gravar(this);
    }
    async atualizar(){
        const pacoDB = new PacoteViagemDB();
        pacoDB.atualizar(this);
    }
    async excluir(){
        const pacoDB = new PacoteViagemDB();
        pacoDB.excluir(this);
    }
    async listar(){
        const pacoDB = new PacoteViagemDB();
        return await pacoDB.listarDB();
    }
}