var { XMLParser, XMLBuilder } = require('fast-xml-parser');
var fs = require('fs');

exports.GetXML = function (file, tag) {
  var data = fs.readFileSync(file, 'utf8');
  var parser = new XMLParser();
  var jsonObj = parser.parse(data);
  return (jsonObj.info[tag]);
}

exports.UpdateXML = function (file, tag, value) {
  var data = fs.readFileSync(file, 'utf8');
  var parser = new XMLParser();
  var jsonObj = parser.parse(data);
  jsonObj.info[tag] = value;
  var builder = new XMLBuilder({ format: true });
  var xml = builder.build(jsonObj);
  fs.writeFileSync(file, xml);
}