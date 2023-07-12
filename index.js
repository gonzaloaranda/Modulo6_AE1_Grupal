const https = require("https");
const fs = require("fs");

// Obtener parametros desde la línea de comandos
const Archivo = process.argv[2];
const Extension = process.argv[3];
const indicador = process.argv[4];
const monto = process.argv[5];

// Se realiza la consulta a la API según ejemplo API
https
  .get("https://mindicador.cl/api", (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      const dailyIndicators = JSON.parse(data);

      // Obtener el valor de conversión del indicador económico escogido
      const tasaConversion = dailyIndicators[indicador].valor;

      // Obtenemos la fecha del momento de cambio
      const fechaActual = new Date().toString();

      // Calcular cambio
      const cambioIndicador = monto / tasaConversion;

      // Creamos el contenido para el archivo
      const fileContent = `A la fecha: ${fechaActual}
Fue realizada cotización con los siguientes datos:
Cantidad de pesos a convertir: ${monto} pesos
Convertido a "${indicador}" da un total de:
$${cambioIndicador.toFixed(2)}`;

      // Crear el archivo
      fs.writeFile(`${Archivo}.${Extension}`, fileContent, (err) => {
        if (err) throw err;
        console.log(`El archivo ${Archivo}.${Extension} ha sido creado.`);
        console.log("Contenido del archivo:");
        console.log(fileContent);
      });
    });
  })
  .on("error", (err) => {
    console.error("Error al realizar la consulta a la API:", err);
  });

// Grupo Verde
  // Cecilia Montero
  // Karla Mieres
  // Gonzalo Aranda
  // Andrea Pilquiman
  // Zimram Blanco
  // Felipe Parra

