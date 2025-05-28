// This script extracts Picto data from data.html and generates a JavaScript file with the data

// Function to parse the HTML table and extract Picto data
function parseDataHtml() {
    // Get the HTML content
    const htmlContent = document.querySelector('table').innerHTML;
    
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Get all table rows (skip the header row)
    const rows = tempDiv.querySelectorAll('tr');
    const pictoData = [];
    
    // Process each row (skip the header row)
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.querySelectorAll('td');
        
        if (cells.length === 3) {
            // Extract data from cells
            const nameCell = cells[0];
            const detailsCell = cells[1];
            const costCell = cells[2];
            
            // Extract name and image URL
            const nameLink = nameCell.querySelector('a');
            const name = nameLink ? nameLink.textContent.trim() : '';
            const imageElement = nameCell.querySelector('img');
            const imageUrl = imageElement ? imageElement.getAttribute('src') : '';
            
            // Extract details
            const detailsText = detailsCell.innerHTML;
            
            // Extract Lumina effect
            const luminaMatch = detailsText.match(/<b class="a-bold">Lumina:<\/b><br>(.*?)<hr/);
            const lumina = luminaMatch ? luminaMatch[1].trim() : '';
            
            // Extract Type
            const typeMatch = detailsText.match(/<b class="a-bold">Type:<\/b> <br>(.*?)<hr/);
            const type = typeMatch ? typeMatch[1].trim() : '';
            
            // Extract Bonus Stats
            const statsMatch = detailsText.match(/<b class="a-bold">Bonus Stats:<\/b><br>(.*?)(?:<\/td>|$)/s);
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
            const cost = parseInt(costCell.textContent.trim());
            
            // Create Picto object
            const picto = {
                name,
                lumina,
                type,
                bonusStats,
                cost,
                image: imageUrl
            };
            
            pictoData.push(picto);
        }
    }
    
    return pictoData;
}

// Function to generate a JavaScript file with the data
function generateJsFile(data) {
    const jsContent = `// Generated Picto data for Clair Obscur Character Planner
// Generated on: ${new Date().toLocaleString()}

const pictoData = ${JSON.stringify(data, null, 2)};

// Export the data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = pictoData;
}
`;
    
    // Create a download link
    const blob = new Blob([jsContent], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'picto-data.js';
    a.click();
    URL.revokeObjectURL(url);
}

// Function to display the parsed data
function displayParsedData(data) {
    console.log(`Parsed ${data.length} Pictos`);
    console.log(data);
    
    // Create a pre element to display the JS code
    const pre = document.createElement('pre');
    pre.textContent = `// Generated Picto data for Clair Obscur Character Planner
// Generated on: ${new Date().toLocaleString()}

const pictoData = ${JSON.stringify(data, null, 2)};

// Export the data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = pictoData;
}`;
    pre.style.maxHeight = '500px';
    pre.style.overflow = 'auto';
    pre.style.backgroundColor = '#f5f5f5';
    pre.style.padding = '10px';
    pre.style.border = '1px solid #ddd';
    pre.style.borderRadius = '5px';
    pre.style.margin = '20px 0';
    
    // Create a button to save the data
    const button = document.createElement('button');
    button.textContent = 'Save as JavaScript File';
    button.style.padding = '10px 20px';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.margin = '10px 0';
    button.onclick = () => generateJsFile(data);
    
    // Create a container
    const container = document.createElement('div');
    container.style.maxWidth = '1200px';
    container.style.margin = '0 auto';
    container.style.padding = '20px';
    
    // Add a heading
    const heading = document.createElement('h1');
    heading.textContent = 'Generated JavaScript Data';
    heading.style.marginBottom = '20px';
    
    // Add a description
    const description = document.createElement('p');
    description.textContent = `Successfully parsed ${data.length} Pictos from the data.html file. You can review the JavaScript code below and save it as a .js file.`;
    description.style.marginBottom = '20px';
    
    // Add elements to the container
    container.appendChild(heading);
    container.appendChild(description);
    container.appendChild(button);
    container.appendChild(pre);
    
    // Clear the body and add the container
    document.body.innerHTML = '';
    document.body.appendChild(container);
}

// Run the parser when the page loads
window.addEventListener('DOMContentLoaded', () => {
    try {
        const data = parseDataHtml();
        displayParsedData(data);
    } catch (error) {
        console.error('Error parsing data:', error);
        alert('Error parsing data: ' + error.message);
    }
});
