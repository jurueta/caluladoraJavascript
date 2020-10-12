$(document).ready(function () {
    mostrarHistorial();
})

$("button").click(function (e) {
    let screen = $('#screen');
    if ($(this).data("key") == 'equal') {
        mostarResultado(screen);
    } else if ($(this).data("key") == 'clear') {
        screen.text('');
    } else {
        let ultimaLetra = screen.text().substr((screen.text().length - 1));
        let letra = $(this).data("key");
        if (!( (letra == "+" || letra == "-" || letra == "*" || letra == "/"||  letra == ".") && (ultimaLetra == "+" || ultimaLetra == "-" || ultimaLetra == "*" || ultimaLetra == "/" || ultimaLetra == "" || ultimaLetra == "."))) {
            screen.text(screen.text() + letra);
        }
    }
})


function undirteclado(event) {
    event.preventDefault();
    let screen = $('#screen');
    var codigo = event.which || event.keyCode;
    if (codigo == 13) {
        mostarResultado(screen);
    }
    if (codigo > 39 && codigo < 62) {

        let ultimaLetra = screen.text().substr((screen.text().length - 1));
        let letra = String.fromCharCode(codigo);
        if (!( (letra == "+" || letra == "-" || letra == "*" || letra == "/"||  letra == ".") && (ultimaLetra == "+" || ultimaLetra == "-" || ultimaLetra == "*" || ultimaLetra == "/" || ultimaLetra == "" || ultimaLetra == "."))) {
            screen.text(screen.text() + letra);
        }
    }
}

$(document).keydown(function (e) {
    var codigo = e.which || e.keyCode;

    if (codigo == 8) {
        let screen = $('#screen');
        screen.text(screen.text().substr(0, (screen.text().length - 1)))
    }

    if (codigo == 46) {
        let screen = $('#screen');
        screen.text('');
    }
});

function mostarResultado(screen) {

    let formula = eval(screen.text());
    console.log(formula);
    if (formula.lenght > 8) {
        formula = eval(screen.text()).toFixed(8);
    }

    let arrayFormula = {
        "formula": screen.text(),
        "Resultado": formula
    }

    screen.text(formula);

    if (localStorage.getItem("historial")) {
        historial = JSON.parse(localStorage.getItem("historial"));
        historial.push(arrayFormula);
        localStorage.setItem("historial", JSON.stringify(historial));
    } else {
        localStorage.setItem("historial", JSON.stringify([arrayFormula]));
    }
    mostrarHistorial()
}

function mostrarHistorial() {
    if (localStorage.getItem("historial")) {
        let acum = "";
        historial = JSON.parse(localStorage.getItem("historial"));
        $.each(historial, function (index, value) {
            if (index == 0) {
                acum += "<button id='borrarHistorial' onclick='borrarHistorial()' >Borrar Historial</button> <Br>";
            }
            acum += value.formula + " = " + value.Resultado + "<Br>";
        })

        $("#ListaHistorial").html(acum);
    }else{
        $("#ListaHistorial").html("");
    }

}


function borrarHistorial() {
    localStorage.removeItem("historial");
    mostrarHistorial();
}

