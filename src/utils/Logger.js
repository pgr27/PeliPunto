// Variable: indica si la aplicación está en producción o no.
// En Git se sube con `true`, y en local se puede cambiar a `false` para desarrollo.
const esProduccion = true;

// Recibe un string y lo muestra en consola solo si NO estamos en producción.
export default function customLog  (...mensaje)  {
    if (!esProduccion) {
        console.log(mensaje);
    }
};
