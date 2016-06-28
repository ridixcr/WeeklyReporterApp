var users = [
    ["Rub21", "Ruben"],
    ["RichRico", "Richman"],
    ["ridixcr", "Pavel"],
    ["ediyes", "Edith"],
    ["Luis36995", "Luis"],
    ["samely", "Sammy"],
    ["karitotp", "Karito"],
    ["calfarome", "Cesar"],
    ["dannykath", "Danny"],
    ["yurasi", "Galia"],
    ["piligab", "Pilar"]
];
var task = [
    ["crossingmajorhighways", "Crossing major highways"],
    ["crossingminorhighways", "Crossing minor highways"],
    ["islandsmajorhighways", "Islands major highways"],
    ["islandsminorhighways", "Islands minor highways"],
    ["impossibleangle", "Kinks major highways"],
    ["kinksminorhighways", "Kinks minor highways"],
    ["overlappingmajorhighways", "Overlapping major highways"],
    ["overlappingminorhighways", "Overlapping minor highways"],
    ["highwayfootpath", "Highway intersects footpath"],
    ["highwayintersectswatermajor", "Highway intersects water - major"],
    ["highwayriverbank", "Highway intersects water - minor"]
];
for (i = 0; i < task.length; i++){
    getJSON(task[i][0]);
}
function getJSON(t) {
    var xmlhttp = createXMLHTTPObject();
    var fecha = "2016-05-10";//"2016-03-30";
    var url = "https://to-fix-backend.mapbox.com/track_stats/"+t+"/from:" + fecha + "/to:" + fecha + "?" + new Date().getTime();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            mkReport(t,data);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function mkReport(task,data) {
    console.log(task);
    console.log(data);
    var str = task+"<br/>";
    for (i = 0; i < users.length; i++) {
        for (j = 0; j < data.stats.length; j++) {
            var e, f, n, s, r = 0;
            var iu = buscarUsuario(data.stats, users[i][0]);
            if (iu > -1) {
                e = esDefinido(data.stats[iu].edit);
                f = esDefinido(data.stats[iu].fix);
                n = esDefinido(data.stats[iu].noterror);
                s = esDefinido(data.stats[iu].skip);
                r = e + f + n + s;
                str+=data.stats[iu].user + "[" + e + ":" + f + ":" + n + ":" + s + "=" + r + "]<br/>";
                console.log(data.stats[iu].user + "[" + e + ":" + f + ":" + n + ":" + s + "=" + r + "]");
                //appEnd("data",data.stats[iu].user + "[" + e + ":" + f + ":" + n + ":" + s + "=" + r + "]<br/>");
                //str+=data.stats[iu].user + "[" + e + ":" + f + ":" + n + ":" + s + "=" + r + "]<br/>";                
            } else {
                r = 0;
            }
            //appEnd("data",r);
            //$("#" + eid).html(r); 
        }
    }
    appEnd("data",str);
}

function appEnd(ref, data) {
    //var v = document.getElementById(ref);
    //v.appendChild(data);
    //v.innerHTML = v.innerHTML + data;
    document.getElementById(ref).innerHTML += data;
}

function esDefinido(v) {
    return v === undefined || v === null ? 0 : v;
}

function buscarUsuario(l, us) {
    var rsp = -1;
    for (is = 0; is < l.length; is++) {
        if (l[is].user.startsWith(us)) {
            rsp = is;
            break;
        }
    }
    return rsp;
}
function createXMLHTTPObject() {
    try {return new XMLHttpRequest();} catch (e) {}
    try {return new ActiveXObject("Msxml3.XMLHTTP");} catch (e) {}
    try {return new ActiveXObjec("Msxml2.XMLHTTP.6.0");} catch (e) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP.3.0");} catch (e) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP");} catch (e) {}
    try {return new ActiveXObject("Microsoft.XMLHTTP");} catch (e) {}
    return null;
}