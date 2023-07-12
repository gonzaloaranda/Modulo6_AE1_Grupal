const https = require("https");
const fs = require("fs");

// Obtener parametros desde la línea de comandos
const fileName = process.argv[2];
const fileExtension = process.argv[3];
const indicator = process.argv[4];
const amount = process.argv[5];

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
      const conversionRate = dailyIndicators[indicator].valor;

      // Obtenemos la fecha del momento de cambio
      const currentDate = new Date().toString();

      // Calcular cambio
      const convertedAmount = amount / conversionRate;

      // Creamos el contenido para el archivo
      const fileContent = `A la fecha: ${currentDate}
Fue realizada cotización con los siguientes datos:
Cantidad de pesos a convertir: ${amount} pesos
Convertido a "${indicator}" da un total de:
$${convertedAmount.toFixed(2)}`;

      // Crear el archivo
      fs.writeFile(`${fileName}.${fileExtension}`, fileContent, (err) => {
        if (err) throw err;
        console.log(`El archivo ${fileName}.${fileExtension} ha sido creado.`);
        console.log("Contenido del archivo:");
        console.log(fileContent);
      });
    });
  })
  .on("error", (err) => {
    console.error("Error al realizar la consulta a la API:", err);
  });
