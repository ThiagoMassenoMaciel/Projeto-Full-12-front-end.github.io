const converted_JSON_OBJECT = JSON.parse(`[{ "first_element": "value index 0"} , {"second_element": "value index 1" , "teste" : "value from property"},  {"Third_element": "value index 2"}]`)

console.log("explicando que se eu escolher utilizar json.parse() poderei acessar o valor das propriedades dos objetos que estão dentro do localStorage")
console.log(converted_JSON_OBJECT)
console.log(converted_JSON_OBJECT[1])
// acessing value from porperty from element from array of objects
console.log(converted_JSON_OBJECT[1].teste)
console.log(converted_JSON_OBJECT[1]["teste"])