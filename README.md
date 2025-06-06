# Clair Obscur Character Planner

A character planner for Clair Obscur: Expedition 33 that allows players to plan their character builds by selecting Pictos and Luminas.

## Features

- **Character Setup**: Set available Lumina Points with visual budget tracking
- **Dual Planning Interface**: 
  - Picto Equipment section (max 3 slots)
  - Lumina Selection section (point-limited)
- **Search & Filter System**: 
  - Text search by name or effect description
  - Filter by Type: Offensive, Defensive, Support
  - Filter by Cost range for Luminas
  - Filter by Bonus Stats: Health, Defense, Speed, Critical Rate
  - Toggle view: Show only Pictos vs. Show only Luminas vs. Show both
- **Build Summary Dashboard**: 
  - Picto Stats: Combined stats from 3 equipped Pictos
  - Lumina Effects: List of active Lumina effects and total cost
  - Total Character Stats: Picto stats + Lumina bonus stats
  - Budget Status: Lumina points used/available
- **Build Management**: 
  - Save builds to browser localStorage with custom names
  - Load saved builds from a dropdown/list
  - Delete saved builds
  - Export build as shareable text/JSON
  - Import build from text/JSON

## Files

1. `index.html` - The main character planner application
2. `picto-data.js` - Contains the Picto and Lumina data used by the planner

## How to Use

1. Open `index.html` in a web browser
2. Set your available Lumina Points in the "Character Setup" section
3. Select Pictos by clicking on them in the "Picto Equipment" section (max 3)
4. Select Luminas by clicking on them in the "Lumina Selection" section
5. Use the search and filter options in the sidebar to find specific Pictos or Luminas
6. Save your build by entering a name and clicking "Save Build"
7. Load or delete saved builds using the "Build Management" section
8. Export your build to share with others, or import a build from someone else

For more detailed instructions, please refer to the USAGE.md file.

## License

This project is for educational purposes only. All game data and images belong to their respective owners.
