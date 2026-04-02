// pogi, sigeh naaaa
let gdpChart, popChart, inflationChart;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    saveStats(); // Cache data
    loadTab('gdp'); // Default tab
});

// Tab switching
function loadTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    // Show selected
    document.getElementById(tabName).classList.add('active');
    
    // Update buttons
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Load chart
    setTimeout(() => renderChart(tabName), 100);
}

// Render Chart.js magic
function renderChart(tabName) {
    const ctx = document.getElementById(tabName + 'Chart').getContext('2d');
    const stats = PH_STATS[tabName];
    
    if (window[tabName + 'Chart']) window[tabName + 'Chart'].destroy();
    
    window[tabName + 'Chart'] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: stats.labels,
            datasets: [{
                label: tabName.toUpperCase(),
                data: stats.data[0],
                borderColor: '#ff6b35',
                backgroundColor: 'rgba(255,107,53,0.2)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: tabName !== 'gdp' }
            }
        }
    });
    
    // Update summary
    const summaryEl = document.getElementById(tabName + 'Summary') || 
                     document.querySelector('#' + tabName + ' p');
    if (summaryEl) summaryEl.textContent = stats.summary;
}

// PWA-ready: Install button
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}
