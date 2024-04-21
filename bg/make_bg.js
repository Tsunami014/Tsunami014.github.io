function make_line(padding=0) {
    document.getElementById('code-blocks').innerHTML += '<div class="code-line" style="padding-left: '+padding.toString()+'px"></div>';
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

function get_padding(html_block) {
    return parseInt(html_block.match('(?<=style="padding-left: ).+?(?=px)')[0]);
}

function total_length(line) {
    var blocks = line.children;
    var sum = 0;
    for (var i = 0; i < blocks.length; i++) {
        sum += get_size(blocks[i].outerHTML);
    }
    return sum;
}

const max_size = 100;

function next() {
    var lines = document.getElementById('code-blocks').children;
    var currentline = lines[lines.length-1];
    var make_newline = false;
    var padding = get_padding(currentline.outerHTML);
    var linetotallen = total_length(currentline);
    if (linetotallen > document.body.offsetWidth-40-padding-80) {
        make_newline = true;
    }
    if ((make_newline || currentline.children.length > 10 || Math.random() < 0.2)&&linetotallen > 50) {
        make_newline = true;
        if (lines.length > 10) {
            lines[0].remove();
        }
        var changeby = 0;
        var result = Math.random();
        if (result < 0.35) {
            changeby = 1;
        } else if (result > 0.65) {
            changeby = -1;
        }
        make_line(Math.max(0, Math.min(padding+changeby*40, 360)));
    } else {make_newline = false;}
    if (make_newline || currentline.children.length == 0 || get_size(currentline.children[currentline.children.length-1].outerHTML) > max_size || Math.random() < 0.1) {
        make_block(Math.random()*20 + Math.random()*20, Math.random()<0.2&&!make_newline);
    } else {
        var currentblock = currentline.children[currentline.children.length-1]
        var size = get_size(currentblock.outerHTML);
        currentblock.outerHTML = currentblock.outerHTML.replace(size.toString(), Math.min(210, Math.round(size+Math.random()*(max_size/4)+max_size/4)).toString())
    }
    //var currentblock = currentline.children[currentline.children.length-1]
    //currentblock.innerHTML = get_size(currentblock.outerHTML);
    setTimeout(next, Math.max(0, Math.random()*100));
}

window.onload = function() {
    document.body.innerHTML = '<div id="code-blocks"></div>' + document.body.innerHTML;
    make_line();
    make_block();
    setTimeout(next,100);
};
  