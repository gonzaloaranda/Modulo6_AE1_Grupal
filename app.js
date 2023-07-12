const { exec } = require("child_process");

// Define los argumentos necesarios para la aplicación
const fileName = "cotiza";
const fileExtension = "txt";
const indicator = "dolar";
const amount = "250000";

// Ejecuta la aplicación con los argumentos correspondientes
const child = exec(
  `node index.js ${fileName} ${fileExtension} ${indicator} ${amount}`,
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
