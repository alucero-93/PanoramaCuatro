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
