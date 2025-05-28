const fs = require('fs');
const cheerio = require('cheerio');

// Read the HTML file
console.log('Reading data.html...');
const html = fs.readFileSync('data.html', 'utf8');

// Load the HTML into cheerio
const $ = cheerio.load(html);

// Array to store the parsed data
const pictos = [];

// Find all table rows (skip the header row)
$('tr').each((index, element) => {
  // Skip the header row
  if (index === 0) return;
  
  // Get the cells in this row
  const cells = $(element).find('td');
  
  // Skip if we don't have exactly 3 cells
  if (cells.length !== 3) return;
  
  // Extract data from cells
  const nameCell = $(cells[0]);
  const detailsCell = $(cells[1]);
  const costCell = $(cells[2]);
  
  // Extract name
  const name = nameCell.find('a').text().trim();
  
  // Extract image URL
  const imageUrl = nameCell.find('img').attr('src');
  
  // Extract Lumina effect
  const luminaText = detailsCell.html();
  const luminaMatch = luminaText.match(/<b class="a-bold">Lumina:<\/b><br>([^<]*)/);
  const lumina = luminaMatch ? luminaMatch[1].trim() : '';
  
  // Extract Type
  const typeMatch = luminaText.match(/<b class="a-bold">Type:<\/b> <br>([^<]*)/);
  const type = typeMatch ? typeMatch[1].trim() : '';
  
  // Extract Bonus Stats
  const statsMatch = luminaText.match(/<b class="a-bold">Bonus Stats:<\/b><br>(.*?)(?:<\/td>|$)/s);
  const statsText = statsMatch ? statsMatch[1].trim() : '';
  
  // Parse bonus stats
  const bonusStats = {
    health: 0,
    defense: 0,
    speed: 0,
    criticalRate: 0
  };
  
  // Health
  const healthMatch = statsText.match(/Health \+(\d+)/);
  if (healthMatch) {
    bonusStats.health = parseInt(healthMatch[1]);
  }
  
  // Defense
  const defenseMatch = statsText.match(/Defense \+(\d+)/);
  if (defenseMatch) {
    bonusStats.defense = parseInt(defenseMatch[1]);
  }
  
  // Speed
  const speedMatch = statsText.match(/Speed \+(\d+)/);
  if (speedMatch) {
    bonusStats.speed = parseInt(speedMatch[1]);
  }
  
  // Critical Rate
  const critMatch = statsText.match(/(?:Critical Rate|Crit Rate) \+(\d+)%/);
  if (critMatch) {
    bonusStats.criticalRate = parseInt(critMatch[1]);
  }
  
  // Extract Cost
  const cost = parseInt(costCell.text().trim());
  
  // Skip if we couldn't extract the name or cost
  if (!name || isNaN(cost)) return;
  
  // Create Picto object
  const picto = {
    name,
    lumina,
    type,
    bonusStats,
    cost,
    image: imageUrl
  };
  
  // Add to the array
  pictos.push(picto);
});

// Write the data to a JSON file
console.log(`Found ${pictos.length} Pictos. Writing to data.json...`);
fs.writeFileSync('data.json', JSON.stringify(pictos, null, 2));
console.log('Conversion complete! Data saved to data.json');

// Also create a JavaScript file that can be included in the application
const jsContent = `// Generated Picto data for Clair Obscur Character Planner
// Generated on: ${new Date().toLocaleString()}

const pictoData = ${JSON.stringify(pictos, null, 2)};

// Export the data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = pictoData;
}
`;

fs.writeFileSync('picto-data.js', jsContent);
console.log('Also saved as picto-data.js for direct inclusion in the application');
