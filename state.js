const stateSelect = document.getElementById('state-select');
const dataContainer = document.getElementById('data-container');

// Mapeo de abreviaturas a nombres completos
const stateNames = {
    AL: 'Alabama',
    AK: 'Alaska',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming',
    AS: 'American Samoa',     // Agregado
    DC: 'District of Columbia', // Agregado
    GU: 'Guam',               // Agregado
    MP: 'Northern Mariana Islands', // Agregado
    PR: 'Puerto Rico',        // Agregado
    VI: 'U.S. Virgin Islands' // Agregado
};

// Obtener los datos de los estados
fetch('https://api.covidtracking.com/v1/states/current.json')
    .then(response => response.json())
    .then(data => {
        // Llenar el select con los nombres de los estados
        data.forEach(state => {
            const option = document.createElement('option');
            option.value = state.state;
            option.textContent = stateNames[state.state] || state.state; // Mostrar nombre completo o el código
            stateSelect.appendChild(option);
        });

        // Manejar el evento de cambio en el select
        stateSelect.addEventListener('change', () => {
            const selectedState = stateSelect.value;
            const stateData = data.find(state => state.state === selectedState);

            // Mostrar los datos del estado seleccionado
            if (stateData) {
                dataContainer.innerHTML = `
                    <div class="state">
                        <h2>${stateNames[stateData.state] || stateData.state}</h2> <!-- Mostrar nombre completo -->
                        <p>Positive Cases: ${stateData.positive}</p>
                        <p>Deaths: ${stateData.death}</p>
                        <p>Hospitalized: ${stateData.hospitalizedCurrently}</p>
                    </div>
                `;
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));
