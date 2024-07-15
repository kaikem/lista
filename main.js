let listadeItens = [];
let itemAEditar;

const formulario = document.querySelector('#form-itens');
const inputItens = document.getElementById('receber-item');
const ulItens = document.querySelector("#lista-de-itens");
const ulItensComprados = document.querySelector("#itens-comprados");
const listaRecuperada = localStorage.getItem('listadeItens');

function atualizaLocalStorage(){
    localStorage.setItem('listadeItens', JSON.stringify(listadeItens));
};

if(listaRecuperada){
    listadeItens = JSON.parse(listaRecuperada);
    mostrarItens();
}else{
    listadeItens = [];
};

formulario.addEventListener('submit', function(evento){
    evento.preventDefault();
    salvarItens();
    mostrarItens();
    inputItens.focus();
});

function salvarItens(){
    const comprasItem = inputItens.value;
    const checarDuplicado = listadeItens.some((elemento)=> elemento.valor.toUpperCase() === comprasItem.toUpperCase());
    if(checarDuplicado){
       alert("Item já cadastrado!") ;
    }else{
        listadeItens.push({
            valor: comprasItem,
            checar: false
        });
    };
    inputItens.value = "";
};

function mostrarItens(){
    ulItens.innerHTML = "";
    ulItensComprados.innerHTML = "";

    listadeItens.forEach((elemento, indice)=>{
        if(elemento.checar){
            ulItensComprados.innerHTML += `<li class="item-compra is-flex is-justify-content-space-between" data-value="${indice}">
            <div>
                <input type="checkbox" checked class="is-clickable" />  
                <span class="itens-comprados">${elemento.valor}</span>
            </div>
            <div>
                <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
        </li>`;
        }else{
            ulItens.innerHTML += `<li class="item-compra is-flex is-justify-content-space-between" data-value="${indice}">
            <div>
                <input type="checkbox" class="is-clickable" />
                <input type="text" class="is-size-5" value="${elemento.valor}" ${indice !== Number(itemAEditar) ? 'disabled' : ''}></input>
            </div>
            <div>
                ${indice === Number(itemAEditar)? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>':'<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
                <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
        </li>`;
        };
    });

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]');
    inputsCheck.forEach(i => {
        i.addEventListener('click', (evento)=>{
            valorDoElemento = evento.target.parentElement.parentElement.getAttribute("data-value");
            listadeItens[valorDoElemento].checar = evento.target.checked;
            mostrarItens();
        })
    });

    const deletarObjeto = document.querySelectorAll('.deletar');
    deletarObjeto.forEach(i => {
        i.addEventListener('click', (evento)=>{
            valorDoElemento = evento.target.parentElement.parentElement.getAttribute("data-value");
            listadeItens.splice(valorDoElemento, 1);
            mostrarItens();
        })
    });    

    const botaoEditar = document.querySelectorAll('.editar');
    botaoEditar.forEach(i => {
        i.addEventListener('click', (evento)=>{
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value');
            mostrarItens();
        })
    });
    
    atualizaLocalStorage();
};

function salvarEdicao() {
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`);
    listadeItens[itemAEditar].valor = itemEditado.value;
    console.log(listadeItens)
    itemAEditar = -1;
    mostrarItens()
};

