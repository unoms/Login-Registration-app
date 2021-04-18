//Global variable
var source = document.getElementById('alert-template').innerHTML
var template = Handlebars.compile(source)
var output = document.getElementById('output-alerts')
var baseUrl = 'http://127.0.0.1:3030/'

