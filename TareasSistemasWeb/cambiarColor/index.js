

function cambiarColor (color) {
    var colorBck = document.getElementById('div_color');
    switch(color){
        case 'verde':
            colorBck.style.backgroundColor="green";
            break;
            case 'rojo':
            colorBck.style.backgroundColor="red";
            break;
            case 'azul':
            colorBck.style.backgroundColor="blue";
            break;
            case 'amarillo':
            colorBck.style.backgroundColor="yellow";
            break;
            default:
                break;
    }
}
