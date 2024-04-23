import * as bg from "./make_bg.js";

function tick() {
    bg.next(false);
    if (Math.random() > 0.02) {
        setTimeout(tick, Math.max(0, Math.random()*100));
    } else {
        var lines = document.getElementById('code-blocks').children;
        var currentline = lines[lines.length-1];
        var currentblock = currentline.children[currentline.children.length-1];
        currentblock.outerHTML = currentblock.outerHTML.replace('style="', 'style="background-color: red;');
    }
}

window.onload = function() {
    document.body.innerHTML = '<div id="code-blocks"></div>' + document.body.innerHTML;
    bg.make_line();
    bg.make_block();
    setTimeout(tick,100);
};
