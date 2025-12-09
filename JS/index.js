 document.addEventListener('DOMContentLoaded', function() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const menuItems = document.querySelectorAll('.menu-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Manejar el estilo del botón activo
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                // Filtrar los items del menú
                menuItems.forEach(item => {
                    if (filter === 'todos' || item.classList.contains(filter)) {
                        item.style.display = 'flex'; // Usar flex para mantener el layout
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    });

    function obtenerVersiculoInspirador() {
    
    // Lista de Referencias Clave (Enfocadas en Gratitud, Familia y Bendición)
    const referenciasFijas = [
        "Salmos 37:4",   // Deléitate en el Señor
        "Proverbios 17:1", // Más vale un plato de verduras donde hay amor...
        "Filipenses 4:6",  // Por nada estéis afanosos...
        "Romanos 12:13", // Compartid para las necesidades...
        "Mateo 5:16",    // Así alumbre vuestra luz...
    ];
    
    // 1. Generar la Fuente (50% Salmos Aleatorios, 50% Referencias Fijas)
    const usarSalmoAleatorio = Math.random() < 0.5;
    let referenciaElegida;
    
    if (usarSalmoAleatorio) {
        // Opción A: Salmo Aleatorio (un versículo específico para que sea corto)
        const numeroSalmo = Math.floor(Math.random() * 150) + 1; 
        // Pedimos solo el primer versículo del Salmo para que sea corto
        referenciaElegida = `Salmos ${numeroSalmo}:1`; 
    } else {
        // Opción B: Referencia Fija de la lista (más relevante al tema familiar)
        const indexAleatorio = Math.floor(Math.random() * referenciasFijas.length);
        referenciaElegida = referenciasFijas[indexAleatorio];
    }
    
    const apiURL = `https://bible-api.com/${referenciaElegida}?translation=rvr60`;

    // 2. Ejecutar la Petición a la API
    fetch(apiURL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener el versículo');
        }
        return response.json();
      })
      .then(data => {
        const contenedor = document.getElementById('versiculo-del-dia');
        
        contenedor.innerHTML = `
          <p class="titulo">✨ **La Palabra Inspira**:</p>
          <p class="texto-versiculo">"${data.text}"</p>
          <p class="referencia"> - ${data.reference} (RVR60)</p>
        `;
      })
      .catch(error => {
        console.error('Hubo un problema con la petición fetch:', error);
        document.getElementById('versiculo-del-dia').innerHTML = 'Que Dios bendiga este lugar y a todos los que comparten en él. (Inspirado en Salmos 128:5)';
      });
}

// Llama a la función al cargar la página
obtenerVersiculoInspirador();