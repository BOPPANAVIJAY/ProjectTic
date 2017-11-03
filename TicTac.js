

var tn = 'X';
var sc = {
    'X': 0,
    'O': 0
};
var gv = 0;

function fload() {
    var select = document.getElementById("grid");
    for (a = 3; a <= 5; a += 1) {
        var option = document.createElement('option');
        select.options[select.options.length] = new Option(a + ' X ' + a, a);
    }

    addEvent(document.getElementById("game"), "click", fchoose);

    fnewgame();
}

function addEvent(ele, ename, callBack) {

    if (ele.addEventListener) {
        ele.addEventListener(ename, callBack, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + ename, callBack);
    }
}

function fchoose(e) {
    if (e.target && e.target.nodeName == "TD") {
        var targele = document.getElementById(e.target.id);
        var preTn;
        if ((targele.className).indexOf("disabled") == -1) {
            targele.innerHTML = tn;
            targele.classList.add('disabled');
            targele.classList.add(tn);
            sc[tn] += 1;
            preTn = tn;
            tn = tn === "X" ? "O" : "X";
            if (fDecide(targele, preTn)) {
                alert(preTn + '  WINS,Congratulations');
                fnewgame();
            } else if ((sc['X'] + sc['O']) == (gv * gv)) {
                alert(' its a DRAW!!');
                fnewgame();
            }
        }
    }
}

function fDecide(targele, preTn) {
    var UL = document.getElementById('game');
    var elements, a, b, count;
    if (sc[preTn] >= gv) {
        var classes = targele.className.split(/\s+/);
        for (a = 0; a < classes.length; a += 1) {
            count = 0;
            if (classes[a].indexOf('row') !== -1 || classes[a].indexOf('column') !== -1 || classes[a].indexOf('targele') !== -1) {
                elements = UL.getElementsByClassName(classes[a]);
                for (b = 0; b < elements.length; b += 1) {
                    if (elements[b].innerHTML == preTn) {
                        count += 1;
                    }
                }
                if (count == gv) {
                    return true;
                }
            }
        }
    }
    return false;
}

function fnewgame() {
    var gameUL = document.getElementById("game");
    if (gameUL.innerHTML !== '') {
        gameUL.innerHTML = null;
        sc = {
            'X': 0,
            'O': 0
        };
        tn = 'X';
        gv = 0;
    }
    var select = document.getElementById("grid");
    gv = select.options[select.selectedIndex].value;
    var a, b, l, c = 0,
        classLists;
    var gridAdd = +gv + 1;

    for (a = 1; a <= gv; a += 1) {
        tr = document.createElement('tr');
        for (b = 1; b <= gv; b += 1) {
            c += 1;
            l = document.createElement('td');
            l.setAttribute("id", 'l' + c);

            classLists = 'td row' + a + ' column' + b;

            if (a === b) {
                classLists = 'td row' + a + ' column' + b + ' diag0';
            }

            if ((a + b) === gridAdd) {
                classLists = 'td row' + a + ' column' + b + ' diag1';
            }

            if (!isEven(gv) && (Math.round(gv / 2) === a && Math.round(gv / 2) === b))
                classLists = 'td row' + a + ' column' + b + ' diag0 diag1';

            l.className = classLists;
            tr.appendChild(l);

        }
        gameUL.appendChild(tr);
    }
}


function isEven(value) {
    if (value % 2 == 0)
        return true;
    else
        return false;
}
