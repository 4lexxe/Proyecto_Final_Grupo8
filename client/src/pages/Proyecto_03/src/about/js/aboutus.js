// Espera a que el DOM esté completamente cargado, evita que el js se ejecute antes de tiempo
document.addEventListener('DOMContentLoaded', function() {

    // Ruta al archivo JSON, lo cargamos usando fetch
    fetch("../src/about/data/members.json")
        // Procesa la respuesta
        .then(response => {

            // Verifica si la respuesta es correcta, si no lo es, lanza un error en  la interfaz
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })

        // Procesa los datos JSON
        .then(data => {
            try {
                // Verifica que los datos sean un array, si no lo es, lanza un error
                if (!Array.isArray(data)) {
                    throw new Error('El JSON no es un array válido');
                }

                // Obtener el elemento de la lista donde se agregarán los miembros
                const teamList = document.getElementById('team-list');

                data.forEach(member => {
                    const listItem = document.createElement('li');
                    listItem.className = 'team-item';

                    // Extrae el username sin el @ para construir el enlace de GitHub
                    const githubUsername = member.contact.replace('@', '');

                    // innerHTML inserta HTML dentro de un elemento
                    listItem.innerHTML = `
                        <img src="${member.image}" alt="Foto de ${member.name}" class="team-image">
                        <h3 class="team-name">${member.name}</h3>
                        <p class="team-order">Orden de Seguimiento: ${member.order}</>
                        <a class="team-contact" href="https://github.com/${githubUsername}" target="_blank">${member.contact}</a>
                    `;

                    // Agrega el <li> a la <ul>
                    teamList.appendChild(listItem);
                });

            } catch (processError) {
                // Captura errores específicos en el procesamiento
                console.error('Error procesando datos:', processError);
                throw processError; // Re-lanza el error para que sea capturado en el catch externo
            }
        })
        // Manejo de errores
        .catch(error => {
            console.error('Error cargando JSON o procesando:', error);
            
            // Mostrar un mensaje en la página
            const teamList = document.getElementById('team-list');
            if (teamList) {
                teamList.innerHTML = `<li class="error">Error: ${error.message}</li>`;
            }
        });
});