const CSV_PREFIX = 'data:text/csv;charset=utf-8,';

const generationCount = parseInt(sessionStorage.getItem('generationCount') || '?');
const populationSize = parseInt(sessionStorage.getItem('populationSize') || '?');
const maxScore = parseInt(sessionStorage.getItem('maxScore') || '?');
const generationWiseFitnesses = JSON.parse(sessionStorage.getItem('generationWiseFitnesses') || '[]');

document.getElementById('generation-count').innerText = generationCount.toString();
document.getElementById('population-size').innerText = populationSize.toString();
document.getElementById('max-score').innerText = maxScore.toString();

const populateCsvLink = () => {
    const downloadStatsButton = document.getElementById('download-stats-button');

    // We need these fields to generate stats output
    if (Number.isNaN(populationSize)) {
        downloadStatsButton.style.display = 'none';
    }

    const generationIndexes = [...Array(populationSize).keys()];
    const header = 'generation,' + generationIndexes.map((i) => `bird-${i}`).join(',');
    const rows = generationWiseFitnesses.map((fitnesses, i) => {
        const fitnessesCols = fitnesses.map((f) => f.toString()).join(',');
        return `${i},${fitnessesCols}`;
    });
    const csvStr = [header, ...rows].join('\n');
    const blob = new Blob([csvStr], {type: 'text/csv'});
    downloadStatsButton.setAttribute('href', window.URL.createObjectURL(blob));
};

populateCsvLink();
