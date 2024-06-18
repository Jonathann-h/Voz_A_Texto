document.addEventListener('DOMContentLoaded', (event) => {
    //Referencias a los botones
    const startButton = document.getElementById('start-btn');
    const stopButton = document.getElementById('stop-btn');
    const clearButton = document.getElementById('clear-btn');
    const resultText = document.getElementById('result-text');

    // Verifica si el navegador soporta la API de reconocimiento de voz
    if (!('webkitSpeechRecognition' in window)) {
        alert("Tu navegador no soporta la API de reconocimiento de voz. :(");
    } else {
        //Se crea una instancia de webkitSpeechRecognition
        const recognition = new webkitSpeechRecognition();

        // Configuración del reconocimiento de voz
        recognition.continuous = true; // Continuar reconociendo incluso después de pausas
        recognition.interimResults = false; // Mostrar resultados solo cuando el discurso se haya completado
        recognition.lang = 'es-ES'; // Configurar el idioma en español

        //Evento para cuando se inicia el reconocimiento de voz
        recognition.onstart = () => {
            startButton.disabled = true;    //Deshabilitar el Boton de Inicio
            stopButton.disabled = false;    //Habilitar el Boton de Detener
            console.log('Reconocimiento de voz iniciado');
        };

        //Evento para cuando se obtiene un resultado del reconocimiento de voz
        recognition.onresult = (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    resultText.value += event.results[i][0].transcript + '\n';
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            console.log('Resultado:', interimTranscript);
        };

        //Evento para un caso de error
        recognition.onerror = (event) => {
            console.error('Error en el reconocimiento de voz:', event.error);
        };

        //Evento para cuando se detiene el reconocimiento de voz
        recognition.onend = () => {
            startButton.disabled = false;   //Se habilita de vuelta el boton de Inicio
            stopButton.disabled = true;     //Se deshabilita el Boton de Detener
            console.log('Reconocimiento de voz detenido');
        };

        //Iniciar el reconocimiento de voz al hacer click en el boton Inicio
        startButton.addEventListener('click', () => {
            recognition.start();
        });

        //Detener el reconocimiento de voz al hacer click en Detener
        stopButton.addEventListener('click', () => {
            recognition.stop();
        });

        //Limpiar el contenido del campo del texto
        clearButton.addEventListener('click', () => {
            resultText.value = '';
        });

        // Inicialmente deshabilitar el botón de detener
        stopButton.disabled = true;
    }
});
