let screen = $('#screen');
const buttons = document.querySelectorAll("#buttons a");

$("a").click(function () {
    if ($(this).data("key") == 'equal') {
        let formula = eval(screen.text());
        if (formula.lenght > 8) {
            screen.text(eval(screen.text()).toFixed(8));
        }else{
            screen.text(formula)
        }
    } else if ($(this).data("key") == 'clear') {
        screen.text('');
    } else {
        screen.text(screen.text() + $(this).data("key"));
    }
})




