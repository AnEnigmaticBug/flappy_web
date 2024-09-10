const generationCount = parseInt(sessionStorage.getItem('generationCount') || '?');
const populationSize = parseInt(sessionStorage.getItem('populationSize') || '?');
const maxScore = parseInt(sessionStorage.getItem('maxScore') || '?');

document.getElementById('generation-count').innerText = generationCount.toString();
document.getElementById('population-size').innerText = populationSize.toString();
document.getElementById('max-score').innerText = maxScore.toString();
