// URL de la API para obtener información sobre todos los estados
const url = 'https://api.covidtracking.com/v2/states.json';

// Hacer la solicitud Axios
axios.get(url)
    .then(response => {
        // Procesar la respuesta
        console.log(response.data.data); // Mostrar los datos en la consola

        // Aquí puedes agregar el código para mostrar los datos en el DOM
        const statesContainer = document.getElementById('covid-data'); // Asegúrate de que este ID exista en tu HTML

        // Iterar sobre los estados y mostrar la información
        response.data.data.forEach(state => {
            const stateCard = document.createElement('div');
            stateCard.className = 'covid-card'; // Asegúrate de tener estilos para esto
            stateCard.innerHTML = `
                <h2>${state.name} (${state.state_code})</h2>
                <p>Población: ${state.census?.population || 'Desconocida'}</p>
                <p>Código FIPS: ${state.fips}</p>
                <p>Prueba preferida: ${state.covid_tracking_project?.preferred_total_test?.field || 'No disponible'} (${state.covid_tracking_project?.preferred_total_test?.units || ''})</p>
                <p>Fuentes de datos:</p>
                <ul>
                    ${state.sites.map(site => `<li><a href="${site.url}" target="_blank">${site.label}</a></li>`).join('')}
                </ul>
            `;
            statesContainer.appendChild(stateCard);
        });
    })
    .catch(error => {
        console.error('Error al obtener la información de los estados:', error);
    });
