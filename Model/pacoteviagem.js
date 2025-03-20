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
    #melhorEpoca;
    #descricao;

    constructor(id, destino, idioma, moeda, fusoHorario, ida, volta, preco, melhorEpoca, descricao){
        this.#id = id;
        this.#destino = destino;
        this.#idioma = idioma;
        this.#moeda = moeda;
        this.#fusoHorario = fusoHorario;
        this.#ida = ida;
        this.#volta = volta;
        this.#preco = preco;
        this.#melhorEpoca = melhorEpoca;
        this.#descricao = descricao;
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
    get melhorEpoca(){
        return this.#melhorEpoca
    }
    get descricao(){
        return this.#descricao
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
    set melhorEpoca(novaEpoca){
        this.#melhorEpoca = novaEpoca;
    }
    set descricao(novaDesc){
        this.#descricao = novaDesc
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
            'preco': this.#preco,
            "melhorEpoca" : this.#melhorEpoca,
            "descricao" : this.#descricao
        }
    }

    async gravar(){
        const pacoDB = new PacoteViagemDB();
        this.#id = await pacoDB.gravar(this);
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