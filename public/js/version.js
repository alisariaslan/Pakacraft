function readFile(file,id)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                document.getElementById(id).innerHTML = rawFile.responseText
              
            }
        }
    }
    rawFile.send(null);
}