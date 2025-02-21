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

    constructor(id, destino, idioma, fusoHorario, moeda, ida, volta, preco){
        this.#id = id;
        this.#destino = destino;
        this.#idioma = idioma;
        this.#fusoHorario = fusoHorario;
        this.#moeda = moeda;
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
    get fusoHorario(){
        return this.#fusoHorario;
    }
    get moeda(){
        return this.#moeda;
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
    set fusoHorario(novoFusoHorario){
        this.#fusoHorario = novoFusoHorario;
    }
    set moeda(novaMoeda){
        this.#moeda = novaMoeda;
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
            'fusoHorario': this.#fusoHorario,
            'moeda': this.#moeda,
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