const loadXMLDoc = filename => {
    if (window.ActiveXObject) {
        xhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } else {
        xhttp = new XMLHttpRequest();
    }
    xhttp.open("GET", filename, false);

    try {
        xhttp.responseType = "msxml-document"
    } catch (err) {
    }
    xhttp.send("");
    return xhttp.responseXML;
};

const fillDropdown = () => {
    let xml = loadXMLDoc("crime.xml");
    let sel = document.getElementById("regionDropdown");
    let provinces = xml.getElementsByTagName("region");

    for (let i = 0; i < provinces.length; ++i) {
        let name = provinces[i].getAttribute("name");
        sel.options[sel.options.length] = new Option(name, name);
    }
};

const renderXSLT = () => {
    let xml;
    let xslt;
    xml = loadXMLDoc("crime.xml");
    xslt = loadXMLDoc("crime.xslt");

    let regionName = document.getElementById("regionDropdown").value;

    if (window.ActiveXObject || xhttp.responseType === "msxml-document") {
        let template = new ActiveXObject("Msxml2.XslTemplate.6.0");
        template.stylesheet = xslt;

        let proc = template.createProcessor();
        proc.input = xml;
        proc.addParameter("province", regionName);

        proc.transform();
        document.getElementById("outputXSLT").innerHTML = proc.output;
    } else if (typeof XSLTProcessor !== 'undefined') {
        let xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xslt);

        xsltProcessor.setParameter(null, "province", regionName);

        let resultDocument = xsltProcessor.transformToFragment(xml, document);
        document.getElementById("outputXSLT").innerHTML = "";
        document.getElementById("outputXSLT").appendChild(resultDocument);
    }
};


