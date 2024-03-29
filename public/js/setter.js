function M_READ(file, id, target) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var data = rawFile.responseText;
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(data, "text/xml");
                data = xmlDoc.getElementsByTagName(target)[0].textContent;
                if (data)
                    document.getElementById(id).innerHTML = data;
                else
                    document.getElementById(id).innerHTML = "null";
            }
        }
    }
    rawFile.send(null);
}

function C_CHANGE(id) {
    var a = document.getElementById(id);
    if (a.innerHTML.includes("Closed"))
        a.style.color = "#ff0000";
    else if (a.innerHTML.includes("Open"))
        a.style.color = "#00ff00";
    else if (a.innerHTML.includes("Starting"))
        a.style.color = "#ffff00";
    else if (a.innerHTML.includes("Closing"))
        a.style.color = "#ffff00";
    else if (a.innerHTML.includes("In Maintenance"))
        a.style.color = "#ffff00";
}