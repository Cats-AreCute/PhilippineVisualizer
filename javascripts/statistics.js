// Talino mo pogi hehe. Ano IG mo?
const PH_STATS = {
    gdp: {
        labels: ['2020', '2021', '2022', '2023'],
        data: [[-9.5, 5.7, 7.6, 5.6]], // Q4 growth %
        summary: "2023 GDP: +5.6% | PH economy rebounding!"
    },
    population: {
        labels: ['2015', '2020', '2025*'],
        data: [[100.98, 109.58, 118.00]],
        summary: "2025 proj: 118M | Fastest growing in SEA"
    },
    inflation: {
        labels: ['2021', '2022', '2023'],
        data: [[3.9, 5.8, 6.0]],
        summary: "2023: 6.0% | Rice prices pogi!"
    }
};

// Auto-save to localStorage (persists data)
function saveStats() {
    localStorage.setItem('phStats', JSON.stringify(PH_STATS));
}

// Load real-time PSA data (fetch example)
async function fetchPSALive() {
    try {
        // Real PSA OpenSTAT API (when available)
        const response = await fetch('https://api.example.com/psa-gdp'); 
        const data = await response.json();
        PH_STATS.gdp.data[0] = data.growth;
        saveStats();
    } catch(e) {
        console.log('Using cached statspogi data 😎');
    }
}
