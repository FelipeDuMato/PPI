const formCadastroClientes = document.getElementById("formPacote")

function validar(event) {
    if (!formCadastroClientes.checkValidity()) {
        formCadastroClientes.classList.add("was-validated")
    } else {
        if(acao == "cadastrar") {
            enviarPacote();
            formCadastroClientes.reset();
            mostrarTabelaPacotes();
        }else if (acao == "atualizar") {
            atualizarPacote();
        }else if (acao == "apagar") {
            apagarPacote();
        }
    };
    mostrarTabelaPacotes();
    event.preventDefault();
    event.stopPropagation();
};

//Função de pegar os dados dos pacotes

function pegarDadosPacotes(){
    const destino = document.getElementById("destino").value;
    const idioma = document.getElementById("idioma").value;
    const moeda = document.getElementById("moeda").value;
    const fusoHorario = document.getElementById("fusoHorario").value;
    const ida = document.getElementById("ida").value;
    const volta = document.getElementById("volta").value;
    const preco = document.getElementById("preco").value;
    const melhorEpoca = document.getElementById("melhorEpoca").value;
    const descricao = document.getElementById("descricao").value;
    if (!document.getElementById("id").disabled) {
        const id = document.getElementById("id").value;
        return {
            "destino" : destino,
            "idioma" : idioma,
            "moeda" : moeda,
            "fusoHorario" : fusoHorario,
            "ida" : ida,
            "volta" : volta,
            "preco" : preco,
            "melhorEpoca" : melhorEpoca,
            "descricao" : descricao,
            "id" : id
        }
    }

    return {
        "destino" : destino,
        "idioma" : idioma,
        "moeda" : moeda,
        "fusoHorario" : fusoHorario,
        "ida" : ida,
        "volta" : volta,
        "preco" : preco,
        "melhorEpoca" : melhorEpoca,
        "descricao" : descricao
    }
};

//Enviar pacote com o método POST
function enviarPacote(){
    const dadosPacote = pegarDadosPacotes();
    fetch("http://localhost:3000/pacotes", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(dadosPacote)
    }).then(resp => {
        return resp.json();
    }).then(dadosReceb => {
        if (dadosReceb.status) {
            mostrar(dadosReceb.mensagem, "success");
        } else {
            mostrar(dadosReceb.mensagem, "danger");
        }
    }).catch(error => {
        mostrar(error, "danger");
    });
};

function atualizarPacote(){ //Pode ser tanto para put quanto para patch
    const dadosPacote = pegarDadosPacotes();
    fetch("http://localhost:3000/pacotes", {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(dadosPacote)
    }).then((resp) =>{
        return resp.json();
    }).then((dadosReceb) =>{
        if (dadosReceb.status){
            mostrar(dadosReceb.mensagem, "success");
        } else {
            mostrar(dadosReceb.mensagem, "danger");
        }
    }).catch((error) =>{
        mostrar(error, "danger");
    })
}

function apagarPacote(){
    const dadosPacote = pegarDadosPacotes();
    fetch("http://localhost:3000/pacotes", {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(dadosPacote)
    }).then((resp) =>{
        return resp.json();
    }).then((dadosReceb) =>{
        if (dadosReceb.status) {
            mostrar(dadosReceb.mensagem, "success");
        } else {
            mostrar(dadosReceb.mensagem, "danger");
        }
    }).catch((error) =>{
        mostrar(error, "danger")
    })
};

//Função de feedback do formulário
function mostrar(mens, tipo="success"){
    const divMensg = document.getElementById("form-feedback");
    divMensg.innerHTML = `<div class="alert alert-${tipo}" role="alert">
                            ${mens}
                        </div>`
    setInterval(()=>{
        divMensg.innerHTML = "";
    }, 5000)
}

//Criar tabela com o método GET

function mostrarTabelaPacotes(){
    fetch("http://localhost:3000/pacotes", {
        method: "GET"
    }).then((resp) => {
        return resp.json();
    }).then((dadosReceb) => {
        if (dadosReceb.status){
            const pacotes = dadosReceb.pacotes
            if (pacotes.length > 0 ){
                const divTabela = document.getElementById("tabelaPacotes");
                divTabela.innerHTML = "";
                const tabela = document.createElement("table");
                tabela.className = "table table-bordered";
                const cabecalho = document.createElement("thead");
                const body = document.createElement('tbody');
                cabecalho.innerHTML = `
                <tr>
                <th>Id</th>
                <th>Destino</th>
                <th>Idioma</th>
                <th>Moeda</th>
                <th>Fuso Horário</th>
                <th>Data de Ida</th>
                <th>Data de Volta</th>
                <th>Preço</th>
                <th>Melhor Época</th>
                <th>Descrição</th>
                <th>Editar</th>
                <th>Excluir</th>`;
                tabela.appendChild(cabecalho);
                for (let i = 0; i < pacotes.length; i++){
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
                    <td>${pacotes[i].melhorEpoca}</td>
                    <td>${pacotes[i].descricao}</td>
                    <td><button type="button" class="btn btn-warning" onclick="pegarPacote('${pacotes[i].destino}', '${pacotes[i].idioma}', '${pacotes[i].moeda}', '${pacotes[i].fusoHorario}', '${pacotes[i].ida}', '${pacotes[i].volta}', ${pacotes[i].preco}, '${pacotes[i].melhorEpoca}', '${pacotes[i].descricao}', 'atualizar')"><i class="bi bi-pencil-fill"></i></td></button></td>
                    <td><button type="button" class="btn btn-danger" onclick="pegarPacote('${pacotes[i].destino}', '${pacotes[i].idioma}', '${pacotes[i].moeda}', '${pacotes[i].fusoHorario}', '${pacotes[i].ida}', '${pacotes[i].volta}', ${pacotes[i].preco}, '${pacotes[i].melhorEpoca}', '${pacotes[i].descricao}', 'apagar', '${pacotes[i].id}')"><i class="bi bi-trash-fill"></i></button></td>`;
                    body.appendChild(linha);
                }
                tabela.appendChild(body);
                divTabela.appendChild(tabela);
            } else {
                mostrar("Não há pacotes cadastrados", "warning")
            }
        } else {
            mostrar(dadosReceb.mensagem, "danger");
        }
    })
}
mostrarTabelaPacotes();

function pegarPacote(destino, idioma, moeda, fusoHorario, ida, volta, preco, melhorEpoca, descricao, acaoEscolhida = "cadastrar", id = ""){
    if(acaoEscolhida == "cadastrar" || acaoEscolhida == "atualizar"){
        document.getElementById("destino").value = destino;
        document.getElementById("idioma").value = idioma;
        document.getElementById("moeda").value = moeda;
        document.getElementById("fusoHorario").value = fusoHorario;
        document.getElementById("ida").value = ida;
        document.getElementById("volta").value = volta;
        document.getElementById("preco").value = preco;
        document.getElementById("melhorEpoca").value = melhorEpoca;
        document.getElementById("descricao").value = descricao;
    } else if (acaoEscolhida == "apagar") {
        document.getElementById("id").value = id;
    }
    if (acaoEscolhida == "atualizar") {
        document.getElementById("label-id").innerHTML = "Informe o ID do Pacote que deseja alterar!";
        document.getElementById("id").disabled = false;
        document.getElementById("atualizar").disabled = false;
        document.getElementById("cadastrar").disabled = true;
        document.getElementById("apagar").disabled = true;
    } else if (acaoEscolhida == "apagar"){
        //Configurando botões o label e inputs
        document.getElementById("label-id").innerHTML = "Informe o ID do Pacote que deseja excluir!";
        document.getElementById("id").disabled = false;
        document.getElementById("cadastrar").disabled = true;
        document.getElementById("atualizar").disabled = true;
        document.getElementById("apagar").disabled = false;
        //Desativando os outros campos
        document.getElementById("destino").disabled = true
        document.getElementById("idioma").disabled = true
        document.getElementById("moeda").disabled = true
        document.getElementById("fusoHorario").disabled = true
        document.getElementById("ida").disabled = true
        document.getElementById("volta").disabled = true
        document.getElementById("preco").disabled = true
        document.getElementById("melhorEpoca").disabled = true
        document.getElementById("descricao").disabled = true
    }
};

document.getElementById("atualizar").onclick = atualizarPacote;
document.getElementById("apagar").onclick = apagarPacote;
formCadastroClientes.onsubmit = validar;