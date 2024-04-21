function make_line() {
    document.getElementById('code-blocks').innerHTML += '<div class="code-line"></div>';
}

function make_block(width=10, invis=false) {
    var lines = document.getElementById('code-blocks').children;
    var invistxt = ""
    if (invis) {
        invistxt = " invisible";
    }
    lines[lines.length-1].innerHTML += '<div class="block'+invistxt+'" style="width: '+width.toString()+'px"></div>';
}

function next() {
    var lines = document.getElementById('code-blocks').children;
    if (lines[lines.length-1].children.length > 20 || Math.random() < 0.1) {
        if (lines.length > 10) {
            lines[0].remove();
        }
        make_line();
    } else {
        make_block(Math.random()*20 + Math.random()*20, Math.random()<0.2);
    }
    setTimeout(next,Math.random()*200+100);
}

window.onload = function() {
    document.body.innerHTML = '<div id="code-blocks"></div>' + document.body.innerHTML;
    make_line();
    setTimeout(next,100);
};
  