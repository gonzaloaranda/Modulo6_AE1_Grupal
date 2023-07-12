const { exec } = require("child_process");

// Define los argumentos necesarios para la aplicación
const Archivo = "cotiza";
const Extension = "txt";
const indicador = "dolar";
const monto = "250000";

// Ejecuta la aplicación con los argumentos correspondientes
const child = exec(
  `node index.js ${Archivo} ${Extension} ${indicador} ${monto}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar la aplicación: ${error}`);
      return;
    }

    if (stderr) {
      console.error(`Error en la salida estándar de la aplicación: ${stderr}`);
      return;
    }

    console.log(`La aplicación se ejecutó correctamente.`);
    console.log("Contenido del archivo:");
    console.log(stdout);
  }
);
