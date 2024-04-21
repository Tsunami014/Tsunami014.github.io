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

function get_size(html_block) {
    return parseInt(html_block.match('(?<=style="width: ).+?(?=px)')[0]);
}

function total_length(line) {
    var blocks = line.children;
    var sum = 0;
    for (var i = 0; i < blocks.length; i++) {
        sum += get_size(blocks[i].outerHTML);
    }
    return sum;
}

function next() {
    var lines = document.getElementById('code-blocks').children;
    var currentline = lines[lines.length-1];
    var make_newline = false;
    if (total_length(currentline) > document.body.offsetWidth-80) {
        make_newline = true;
    }
    if (make_newline || currentline.children.length == 0 || get_size(currentline.children[currentline.children.length-1].outerHTML) > 200 || Math.random() < 0.1) {
        if (make_newline || currentline.children.length > 10 || Math.random() < 0.1) {
            if (lines.length > 10) {
                lines[0].remove();
            }
            make_line();
        }
        make_block(Math.random()*20 + Math.random()*20, Math.random()<0.2);
    } else {
        var currentblock = currentline.children[currentline.children.length-1]
        var size = get_size(currentblock.outerHTML);
        currentblock.outerHTML = currentblock.outerHTML.replace(size.toString(), Math.round(size+Math.random()*50).toString())
    }
    //var currentblock = currentline.children[currentline.children.length-1]
    //currentblock.innerHTML = get_size(currentblock.outerHTML);
    setTimeout(next, Math.random()*200);
}

window.onload = function() {
    document.body.innerHTML = '<div id="code-blocks"></div>' + document.body.innerHTML;
    make_line();
    make_block(10);
    setTimeout(next,100);
};
  