let draggedElement = null;

var helpActive = false;

let arr = [
  {
    id: 1,
    name: "Título",
    element: '<h1 class="center" contenteditable="true">Título de exemplo</h1>',
  },
  {
    id: 2,
    name: "Imput",
    element:
      '<label contenteditable="true">Texto de exemplo: </label> <input type="text" id="{$q1_name} name="{$q1_name}" value="" style="width:200px""></input>',
  },
];
let elementsDiv = document.querySelector("#elements");
arr.forEach(function (item) {
  let newElement = document.createElement("div");
  newElement.className = "draggable";
  newElement.draggable = true;
  newElement.id = item.id;
  newElement.innerHTML = item.name;
  newElement.addEventListener("dragstart", drag);
  elementsDiv.appendChild(newElement);
});

// Função para permitir que a área de destino aceite elementos arrastados
function allowDrop(event) {
  event.preventDefault();
}

// Cria um novo elemento quando um elemento é solto na área de destino
function drop(event) {
  messageInBox(event);

  let el = arr.find((e) => e.id == draggedElement.id).element;
  event.preventDefault();

  let newElement = document.createElement("div");
  newElement.className = "draggable col-12 col-xs-12";
  newElement.draggable = true;
  newElement.insertAdjacentHTML("beforeend", el);
  document.getElementById("dropzone").appendChild(newElement);

  //criar escultadores para o elemento
  newElement.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("text", event.target.id);
  });

  newElement.addEventListener("dragend", function (event) {
    event.preventDefault();
  });

  newElement.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    if (event.target.tagName == "DIV") {
      event.target.remove();
    } else {
      event.target.parentNode.remove();
    }
    if (!document.getElementById("dropzone").children.length) {
      document.getElementById("dropzone").innerHTML =
        "<h3 class='center'>Solte aqui :)</h3>";
    }
  });

  newElement.addEventListener("dblclick", function (event) {
    event.preventDefault();
    if (event.target.tagName != "DIV") {
      console.log("edita", event.target);
    }
  });
}

// Capitura o elemento arrastado
function drag(event) {
  draggedElement = event.target;
}
// Mostra o menu de ajuda
function help() {
  document.querySelector("#help").style.display = helpActive ? "none" : "block";
  document.querySelector("#edition").style.display = helpActive
    ? "block"
    : "none";
  helpActive = !helpActive;
}
//remove e coloca mensagem do box
function messageInBox(event) {
  if (event.target.innerHTML == "Solte aqui :)") {
    event.target.remove();
  } else {
    if (event.target.firstElementChild.innerHTML == "Solte aqui :)") {
      event.target.firstElementChild.remove();
    }
  }
}
