#!/bin/bash

# Script to convert data.html to data.json
# This extracts Picto data from the HTML table and formats it as JSON

echo "Converting data.html to data.json..."

# Create a temporary file to store the extracted data
temp_file=$(mktemp)

# Extract all table rows with Picto data
cat data.html | tr -d '\n' | sed 's/<tr>/\n<tr>/g' | grep '<td class="Pictos_cell center">' > "$temp_file"

# Start the JSON array
echo "[" > data.json

# Process each row in the temp file
while IFS= read -r row; do
    # Extract name
    name=$(echo "$row" | grep -o '<a class="a-link"[^>]*>[^<]*</a>' | sed -E 's/.*>([^<]+)<\/a>/\1/')
    
    # Extract image URL
    image=$(echo "$row" | grep -o 'src="[^"]*"' | head -1 | sed 's/src="\([^"]*\)"/\1/')
    
    # Extract Lumina effect
    lumina=$(echo "$row" | grep -o '<b class="a-bold">Lumina:</b><br>[^<]*' | sed 's/<b class="a-bold">Lumina:<\/b><br>\(.*\)/\1/')
    
    # Extract Type
    type=$(echo "$row" | grep -o '<b class="a-bold">Type:</b> <br>[^<]*' | sed 's/<b class="a-bold">Type:<\/b> <br>\(.*\)/\1/' | sed 's/^[ \t]*//;s/[ \t]*$//')
    
    # Extract Bonus Stats
    stats_section=$(echo "$row" | grep -o '<b class="a-bold">Bonus Stats:</b><br>.*</td>' | sed 's/<b class="a-bold">Bonus Stats:<\/b><br>\(.*\)<\/td>/\1/')
    
    # Extract Health
    health=$(echo "$stats_section" | grep -o 'Health +[0-9]*' | grep -o '[0-9]*')
    if [ -z "$health" ]; then
        health=0
    fi
    
    # Extract Defense
    defense=$(echo "$stats_section" | grep -o 'Defense +[0-9]*' | grep -o '[0-9]*')
    if [ -z "$defense" ]; then
        defense=0
    fi
    
    # Extract Speed
    speed=$(echo "$stats_section" | grep -o 'Speed +[0-9]*' | grep -o '[0-9]*')
    if [ -z "$speed" ]; then
        speed=0
    fi
    
    # Extract Critical Rate
    critRate=$(echo "$stats_section" | grep -o 'Crit Rate +[0-9]*%' | grep -o '[0-9]*')
    if [ -z "$critRate" ]; then
        critRate=$(echo "$stats_section" | grep -o 'Critical Rate +[0-9]*%' | grep -o '[0-9]*')
        if [ -z "$critRate" ]; then
            critRate=0
        fi
    fi
    
    # Extract Cost
    cost=$(echo "$row" | grep -o '<td class="Cost_cell center">[0-9]*</td>' | grep -o '[0-9]*')
    
    # Skip if we couldn't extract the name or cost
    if [ -z "$name" ] || [ -z "$cost" ]; then
        continue
    fi
    
    # Create JSON object for this Picto
    cat >> data.json << EOF
  {
    "name": "$name",
    "lumina": "$lumina",
    "type": "$type",
    "bonusStats": {
      "health": $health,
      "defense": $defense,
      "speed": $speed,
      "criticalRate": $critRate
    },
    "cost": $cost,
    "image": "$image"
  },
EOF
    
done < "$temp_file"

# Remove the trailing comma from the last item and close the JSON array
sed -i '' '$ s/,$//' data.json
echo "]" >> data.json

# Clean up
rm "$temp_file"

echo "Conversion complete! Data saved to data.json"
echo "Found $(grep -c '{' data.json) Pictos"
