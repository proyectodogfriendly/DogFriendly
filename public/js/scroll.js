onload = inicia; 
onscroll = desplaza; 

var desplazamiento, contenedor; 

function inicia() {
contenedor = document.querySelector("main"); 
document.body.style.height = contenedor.offsetHeight + "px"
}

function desplaza() {
contenedor.style.top = -pageYOffset + "px"; 
}
