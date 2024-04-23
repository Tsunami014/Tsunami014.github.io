const MAX_SIZE = 100;
const MAX_INVIS_SIZE = 10;
const MAX_LINES = 20;


export function make_line(padding=0) {
    document.getElementById('code-blocks').innerHTML += '<div class="code-line" style="padding-left: '+padding.toString()+'px"></div>';
}

export function make_block(width=10, invis=false) {
    var lines = document.getElementById('code-blocks').children;
    var invistxt = ""
    if (invis) {
        invistxt = " invisible";
    }
    lines[lines.length-1].innerHTML += '<div class="block'+invistxt+'" style="width: '+width.toString()+'px"></div>';
}

export function get_size(html_block) {
    return parseInt(html_block.match('(?<=style="width: ).+?(?=px)')[0]);
}

export function is_invisible(html_block) {
    return html_block.includes('invisible');
}

export function get_padding(html_block) {
    return parseInt(html_block.match('(?<=style="padding-left: ).+?(?=px)')[0]);
}

export function total_length(line) {
    var blocks = line.children;
    var sum = 0;
    for (var i = 0; i < blocks.length; i++) {
        sum += get_size(blocks[i].outerHTML);
    }
    return sum;
}

export function next(timeout = true) {
    var lines = document.getElementById('code-blocks').children;
    var currentline = lines[lines.length-1];
    var make_newline = false;
    var padding = get_padding(currentline.outerHTML);
    var linetotallen = total_length(currentline);
    if (linetotallen > document.body.offsetWidth-120-padding) {
        make_newline = true;
    }
    if ((make_newline || currentline.children.length > 10 || Math.random() < 0.2)&&linetotallen > 50) {
        make_newline = true;
        if (lines.length > MAX_LINES) {
            lines[0].remove();
        }
        var changeby = 0;
        var result = Math.random();
        if (result < 0.35) {
            changeby = 1;
        } else if (result > 0.6) {
            changeby = -1;
        }
        make_line(Math.max(0, Math.min(padding+changeby*40, 360)));
    } else {make_newline = false;}
    if (make_newline || currentline.children.length == 0 || get_size(currentline.children[currentline.children.length-1].outerHTML) > MAX_SIZE || Math.random() < 0.1) {
        make_block(Math.random()*20 + Math.random()*20, Math.random()<0.2&&!make_newline);
    } else {
        var currentblock = currentline.children[currentline.children.length-1]
        var size = get_size(currentblock.outerHTML);
        var max_this_size = MAX_SIZE;
        if (is_invisible(currentblock.outerHTML)) {
            max_this_size = MAX_INVIS_SIZE;
        }
        currentblock.outerHTML = currentblock.outerHTML.replace(size.toString(), Math.min(max_this_size+(max_this_size/10), Math.round(size+Math.random()*(MAX_SIZE/4)+max_this_size/4)).toString())
    }
    //var currentblock = currentline.children[currentline.children.length-1]
    //currentblock.innerHTML = get_size(currentblock.outerHTML);
    if (timeout) {
        setTimeout(next, Math.max(0, Math.random()*100));
    }
}

window.onload = function() {
    document.body.innerHTML = '<div id="code-blocks"></div>' + document.body.innerHTML;
    make_line();
    make_block();
    setTimeout(next,100);
};

export {MAX_SIZE, MAX_INVIS_SIZE, MAX_LINES};
  