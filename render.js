function formatText(elm, str, besafe = false) {
    var safeText;
    if (besafe) {
        safeText = str
            .replaceAll(/&/gm, "&amp;")
            .replaceAll(/</gm, "&lt;")
            .replaceAll(/>/gm, "&gt;")
            .replaceAll(/"/gm, "&quot;")
            .replaceAll(/'/gm, "&#039;");
    } else {
        safeText = str;
    }
    
    var blocks = [];
    // TODO: Backslashes
    safeText.split(/^\s*```/gm).forEach((val, idx)=>{
        var newVal;
        if (idx % 2 == 0) {
            newVal = val.replace(/^\n/g, '')
                .replaceAll(/^(\s*)&gt; (.+)$/gm, (_, spaces, content) => {
                    let margin = Math.floor(spaces.replace('\t', '    ').length / 2)*2;
                    return `<span class="quote" style="margin-left: ${margin}em;">${content}</span>`
                })
                .replaceAll(/^(?:(?:\|.*)+\|\n){2,}/gm,
                (match) => {
                    var spl = match.split('\n');
                    // let weighting = spl[1].split('|'); // TODO
                    var end = '<tr>';
                    spl[0].split('|').forEach(val=>{
                        if (val) {
                            end += `<td class="table-top"><b>${val}</b></td>`;
                        }
                    });
                    end += '</tr>';
                    spl.slice(2).forEach(row=>{
                        if (row) {
                            end += '<tr>';
                            row.split('|').forEach(val=>{
                                if (val) {
                                    end += `<td>${val}</td>`;
                                }
                            });
                            end += '</tr>';
                        }
                    });

                    return `<table class="format-table" align="center">${end}</table>`
                })
                .replaceAll(/^(\s*)[-*] (.*)/gm, (_, spaces, content) => {
                    let margin = Math.floor(spaces.replace('\t', '    ').length / 2)*2;
                    return `<ul><li style="margin-left: ${margin}em;">${content}</li></ul>`;
                })
                .replaceAll(/<\/ul>\s*<ul>/g, '')
                .replaceAll(/^(\s*)(\d+)[.) ](.*)/gm, (_, spaces, number, content) => {
                    let margin = Math.floor(spaces.replace('\t', '    ').length / 2)*2;
                    return `<ol><li value="${number}" style="margin-left: ${margin}em;">${content}</li></ol>`;
                })
                .replaceAll(/<\/ol>\s*<ol>/g, '')
                
                .replaceAll(/!\[((?:(?:\[[^\]]*\]\([^)]*\))|[^\]])*)\]\(([^)]*)\)/g, '<img class="format-img" src="$2" alt="$1">')
                .replaceAll(/\[([^\]]*)\]\(([^)]*)\)/g, '<a href="$2">$1</a>')

                .replaceAll(/^# ([^\n]*)$/gm, '<h1>$1</h1>')
                .replaceAll(/^## ([^\n]*)$/gm, '<h2>$1</h2>')
                .replaceAll(/^### ([^\n]*)$/gm, '<h3>$1</h3>')
                .replaceAll(/^#### ([^\n]*)$/gm, '<h4>$1</h4>')
                .replaceAll(/^##### ([^\n]*)$/gm, '<h5>$1</h5>')
                .replaceAll(/^###### ([^\n]*)$/gm, '<h6>$1</h6>')
                .replaceAll(/`([^`\n]+)`/g, '<span class="code-inline">$1</span>')

                .replaceAll(/^[*\-_]{3}$/gm, '<hr>')

                .replaceAll(/>\n+/gm, '>')
                .replaceAll('\n</div>', '</div>')

                .replaceAll(/[*_]{2}((?=[^*_])[^\n<]+?(?<=[^*_]))[*_]{2}/g,'<b>$1</b>')
                .replaceAll(/[*_]((?=[^*_])(?:[^\n<]|(?:<\/?b>))+?(?<=[^*_]))[*_]/g, '<i>$1</i>')
        } else {
            const newlineIndex = val.indexOf('\n');
            let language = '';
            let code = val.replace(/\n$/g, '');
            
            if (newlineIndex !== -1) {
                language = val.slice(0, newlineIndex).trim();
                code = val.slice(newlineIndex + 1);
            }
            
            if (!language) {
                language = 'plain'
            } else {
                language = language.toLowerCase().trim();
            }

            newVal = `<div class="code-block"><div class="codetop"><span class="codelang">${language}</span><button onclick="copyCodeBlock(this)">📋️ Copy</button></div><div class="code-${language} code-block-txt">${code}</div></div><br>`;
        }
        blocks.push(
            newVal
                .replaceAll('\t', '&emsp;')
                .replaceAll(/^ +/gm, match => '&nbsp;'.repeat(match.length))
                .replaceAll('\n\n', '<br>')
                .replaceAll('\n', '<br>')
        )
    })

    elm.innerHTML = blocks.join('');
}
async function render(mdFile, besafe = false) {
    resp = await fetch(mdFile);
    respt = await resp.text();
    formatText(document.getElementById('inside'), respt, besafe);
}

function copyCodeBlock(elm) {
    navigator.clipboard.writeText(elm.parentElement.parentElement.lastElementChild.innerText.replaceAll(/\s(?<![\n\t\r\f\v ])/g, ' '));
    let origTxt = elm.innerText;
    elm.innerText = '✔ Copied!';
    setTimeout(()=>{
        elm.innerText = origTxt;
        elm.blur();
    }, 1000)
}

document.addEventListener('DOMContentLoaded', function() {
    const meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1";
    document.head.appendChild(meta);

    const comment1 = document.createComment("Made with love by Tsunami014");
    document.head.appendChild(comment1);

    const comment2 = document.createComment("Background inspiration from https://curtisfenner.com/");
    document.head.appendChild(comment2);

    const script = document.createElement('script');
    script.src = "https://tsunami014.github.io/bg/make_bg.js";
    script.type = "module";
    document.head.appendChild(script);

    const link1 = document.createElement('link');
    link1.rel = "stylesheet";
    link1.href = "https://tsunami014.github.io/bg/bg.css";
    document.head.appendChild(link1);

    const link2 = document.createElement('link');
    link2.rel = "stylesheet";
    link2.href = "https://tsunami014.github.io/style.css";
    document.head.appendChild(link2);
});
