//Obter os elementos da página
const frm = document.querySelector("form");
const dvPalco = document.querySelector("#divPalco");

//constante para definir o número de poltronas
const POLTRONAS = 240;

//vetor com as poltronas reservadas pelo cliente
const reservadas = [];

window.addEventListener("load", () =>{
    //se houver dados salvos em localStorage, faz um split(";") e atribui esses dados ao array. Caso contrário, inicializamos o array
    const ocupadas = localStorage.getItem("teatroOcupadas")//operador ternário 
    ? localStorage.getItem("teatroOcupadas").split(";")
    :[];
    
    //montar o número total de poltronas definidas pela constante POLTRONAS
    for(let i = 1; i <= POLTRONAS; i++){
        const figure = document.createElement("figure"); //cria a tag figura
        const imgStatus = document.createElement("img"); //cria o status da figura --> tag img

         //se a posição estiver ocupada, exibe a imagem ocupada, senão, a imagem disponível
        imgStatus.src = ocupadas.includes(i.toString())
        ? "img/ocupada.jpg"
        : "img/disponivel.jpg";
        imgStatus.className = "poltrona"; // classe com a dimensão da imagem 
        
        const figureCap = document.createElement("figcaption"); //cria a figcaption

        //quantidade de zeros antes do número da poltrona
        const zeros = i < 10 ? "00" : i < 100 ? "0" : "";
    
        const num = document.createTextNode(`[${zeros}${i}]`); //cria o texto


        //define os pais de cada tag crianda
        figureCap.appendChild(num);

        figure.appendChild(imgStatus);

        figure.appendChild(figureCap);

        //se i módulo de 24 == 12 (é o corredor: define margem direita 60px)
        if(i % 24 == 12) figure.getElementsByClassName.marginRight = "60px"

        dvPalco.appendChild(figure); //indica que a figura é filha da divPalco

        //se i módulo de 24 == 0: o código após && será executado (inserindo quebra de linha)
        (i%24 == 0) && dvPalco.appendChild(document.createElement("or"));
    }

})


frm.addEventListener("submit", (e) =>{
    e.preventDefault();

    //obtém o conteúdo do input
    const poltrona = Number(frm.inPoltrona); 

    //valida o preenchimento de  entrada, se for maior que a constante
    if(poltrona > POLTRONAS){
        alert("Informe um número de poltrona válido!")
        frm.inPoltrona.focus();
        return;
    }

    const ocupadas = localStorage.getItem("teatroOcupadas")
    ? localStorage.getItem("teatroOcupadas").split(";")
    : [];

    //validar se a poltrona já estiver ocupada
    if(ocupadas.includes(poltrona.toString())){
        alert(`A poltrona ${poltrona} já está ocupada.`);
        frm.inPoltrona.value="";
        frm.inPoltrona.focus();
        return;
    }

    //capturar a imagem da poltrona, que é filha da dvPalco
    const imgPoltrona = dvPalco.querySelectorAll("img")[poltrona-1];

    //Modifica o atributo da imagem
    imgPoltrona.src = "img/reservada.jpg";

    //Adiciona a poltrona ao vetor
    reservadas.push(poltrona); 

    frm.inPoltrona.value="";
    frm.inPoltrona.focus();
})
