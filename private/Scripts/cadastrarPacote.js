const formPacote = document.getElementById("formuPacotes");
let acao = "cadastrar";


function manipularEnvio(evento){
    if (!formPacote.checkValidity()) {
        formPacote.classList.add("was-validated");
    } else {
        if (acao == "atualizar"){
            mostrarTabelaPac();
        } else if (acao == "apagar"){
            mostrarTabelaPac();
        } else {
        enviarPacote();
        formPacote.reset();
        mostrarTabelaPac();
        }
    }
    evento.preventDefault();
    evento.stopPropagation();
}

function pegarDadosPacote(){
    const id = document.getElementById("identify").value;
    const destino = document.getElementById("destino").value;
    const idioma = document.getElementById("idioma").value;
    const moeda = document.getElementById("moeda").value;
    const fusoHorario = document.getElementById("fusoHorario").value;
    const ida = document.getElementById("ida").value;
    const volta = document.getElementById("volta").value;
    const preco = document.getElementById("preco").value;

    return {
        "id" : id,
        "destino" : destino,
        "idioma" : idioma,
        "moeda" : moeda,
        "fusoHorario" : fusoHorario,
        "ida" : ida,
        "volta" : volta,
        "preco" : preco
    }
}

function enviarPacote(){
    const dadosPac = pegarDadosPacote();
    fetch("http://localhost:3000/pacotes", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(dadosPac)
    }).then((resp) =>{
        return resp.json()
    }).then((dadosReceb) =>{
        if (dadosReceb.status) {
            mostrarMensg(dadosReceb.mensagem, "success");
        } else {
            mostrarMensg(dadosReceb.mensagem, "danger");
        }
    }).catch((error) =>{
        mostrarMensg(error, "danger");
    })
}

function mostrarMensg(mensagem, tipo = "success"){
    const divMens = document.getElementById("mensagem");
    divMens.innerHTML = `<div class="alert alert-${tipo}" role="alert">
    ${mensagem}
</div>`
setInterval(()=>{
    divMens.innerHTML = ""
}, 5000)
}

function mostrarTabelaPac(){
    fetch("http://localhost:3000/pacotes", {
        method : "GET"
    }).then((resp)=>{
        return resp.json();
    }).then((dadosReceb)=>{
        if (dadosReceb.status){
            const pacotes = dadosReceb.pacotes;
            if (pacotes.length > 0){
                const divTabela = document.getElementById("tabelaPac");
                divTabela.innerHTML = "";
                const tabela = document.createElement("table");
                tabela.className = "table table-dark table-striped";
                const cabecalho = document.createElement("thead");
                const corpo = document.createElement("tbody");
                cabecalho.innerHTML = `
                <tr>
                <th>Id</th>
                <th>Destino</th>
                <th>Idioma</th>
                <th>Moeda</th>
                <th>Fuso Horário</th>
                <th>Data de ida</th>
                <th>Data de volta</th>
                <th>Preço</th>
                <th>Editar</th>
                <th>Excluir</th>
                </tr>`;
                tabela.appendChild(cabecalho);
                for (let i = 0; i < pacotes.length; i++) {
                    const linha = document.createElement("tr");
                    linha.innerHTML = `
                    <td>${pacotes[i].id}</td>
                    <td>${pacotes[i].destino}</td>
                    <td>${pacotes[i].idioma}</td>
                    <td>${pacotes[i].moeda}</td>
                    <td>${pacotes[i].fusoHorario}</td>
                    <td>${pacotes[i].ida}</td>
                    <td>${pacotes[i].volta}</td>
                    <td>${pacotes[i].preco}</td>
                    <td>
                    <button class="btn btn-sm btn-warning" onclick="pegarPacote(${pacotes[i].id}, '${pacotes[i].destino}', '${pacotes[i].idioma}', '${pacotes[i].moeda}', '${pacotes[i].fusoHorario}', '${pacotes[i].ida}', '${pacotes[i].volta}', '${pacotes[i].preco}', 'atualizar')">
                    <i class="bi bi-pencil-fill"></i>
                    </button>
                    </td>
                    <td>
                    <button class="btn btn-sm btn-danger" onclick="pegarPacote(${pacotes[i].id}, '${pacotes[i].destino}', '${pacotes[i].idioma}', '${pacotes[i].moeda}', '${pacotes[i].fusoHorario}', '${pacotes[i].ida}', '${pacotes[i].volta}', '${pacotes[i].preco}', 'apagar')">
                    <i class="bi bi-trash-fill"></i>
                    </button>
                    </td>`;
                    corpo.appendChild(linha)
                }
                tabela.appendChild(corpo);
                divTabela.appendChild(tabela);
            }
        }else{
            mostrarMensg(dadosReceb.mensagem, "danger");
        }
    }).catch((error)=>{
        mostrarMensg(error, "danger");
    })
}

function pegarPacote(id, destino, idioma, moeda, fusoHorario, ida, volta, preco, acaoEsc = "atualizar"){
    document.getElementById("identify").value = id;
    document.getElementById("destino").value = destino;
    document.getElementById("idioma").value = idioma;
    document.getElementById("moeda").value = moeda;
    document.getElementById("fusoHorario").value = fusoHorario;
    document.getElementById("ida").value = ida;
    document.getElementById("volta").value = volta;
    document.getElementById("preco").value = preco;
    if (acaoEsc == "atualizar"){
        acao = "atualizar";
        document.getElementById("cadastrar").disabled = true;
        document.getElementById("atualizar").disabled = false;
        document.getElementById("apagar").disabled = true;
    } else if (acaoEsc == "apagar"){
        acao = "apagar";
        document.getElementById("cadastrar").disabled = true;
        document.getElementById("atualizar").disabled = true;
        document.getElementById("apagar").disabled = false;
    }
}

function atualizarPacote(){
    const dadosPac = pegarDadosPacote();
    fetch("http://localhost:3000/pacotes", {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(dadosPac)
    }).then((resp) =>{
        return resp.json()
    }).then((dadosReceb) =>{
        if (dadosReceb.status) {
            mostrarMensg(dadosReceb.mensagem, "success");
        } else {
            mostrarMensg(dadosReceb.mensagem, "danger");
        }
    }).catch((error) =>{
        mostrarMensg(error, "danger");
    })
    acao = "cadastrar";
    document.getElementById("cadastrar").disabled = false;
    document.getElementById("atualizar").disabled = true;
    document.getElementById("apagar").disabled = true;
    formPacote.reset();
    mostrarTabelaPac();
}

function apagarPacote(){
    const dadosPac = pegarDadosPacote();
    fetch("http://localhost:3000/pacotes", {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(dadosPac)
    }).then((resp) =>{
        return resp.json()
    }).then((dadosReceb) =>{
        if (dadosReceb.status) {
            mostrarMensg(dadosReceb.mensagem, "success");
        } else {
            mostrarMensg(dadosReceb.mensagem, "danger");
        }
    }).catch((error) =>{
        mostrarMensg(error, "danger");
    })
    acao = "cadastrar";
    document.getElementById("cadastrar").disabled = false;
    document.getElementById("atualizar").disabled = true;
    document.getElementById("apagar").disabled = true;
    formPacote.reset();
    mostrarTabelaPac();
}

document.getElementById("atualizar").onclick = atualizarPacote;
document.getElementById("apagar").onclick = apagarPacote;
formPacote.onsubmit = manipularEnvio;
mostrarTabelaPac();