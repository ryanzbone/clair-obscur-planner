# Clair Obscur Character Planner - Usage Guide

This document explains how to use the Clair Obscur Character Planner and its associated tools.

## Getting Started

The Character Planner consists of several files:

1. `index.html` - The main character planner application
2. `picto-data.js` - Contains the Picto and Lumina data used by the planner
3. `parse-data.html` - Tool to parse data from data.html and save it as JSON
4. `generate-data.html` - Tool to parse data from data.html and save it as a JavaScript file
5. `data-parser.js` - Script used by parse-data.html to parse the data
6. `generate-data-js.js` - Script used by generate-data.html to generate the JavaScript file
7. `data.html` - Contains the raw Picto data from the game

## Using the Character Planner

To use the character planner:

1. Open `index.html` in a web browser
2. Set your available Lumina Points in the "Character Setup" section
3. Select Pictos by clicking on them in the "Picto Equipment" section (max 3)
4. Select Luminas by clicking on them in the "Lumina Selection" section
5. Use the search and filter options in the sidebar to find specific Pictos or Luminas
6. Save your build by entering a name and clicking "Save Build"
7. Load or delete saved builds using the "Build Management" section
8. Export your build to share with others, or import a build from someone else

## Updating the Picto Data

If the game data changes or you want to use the latest data:

### Option 1: Using parse-data.html

1. Make sure `data.html` contains the latest data from the game
2. Open `parse-data.html` in a web browser
3. Click "Load and Parse Data"
4. Review the parsed data
5. Click "Save to JSON" to download the data as a JSON file

### Option 2: Using generate-data.html (Recommended)

1. Make sure `data.html` contains the latest data from the game
2. Open `generate-data.html` in a web browser
3. Click "Generate JavaScript File"
4. Review the generated JavaScript code
5. Click "Save as JavaScript File" to download the data as a .js file
6. Replace the existing `picto-data.js` file with the downloaded file

## Features

The Character Planner includes the following features:

### Character Setup
- Set available Lumina Points for the character
- Visual indicator of points spent vs. available

### Dual Planning Interface
- Picto Equipment Section (Max 3 slots)
- Lumina Selection Section (Point-limited)

### Search & Filter System
- Text search by name or effect description
- Filter by Type: Offensive, Defensive, Support
- Filter by Cost range for Luminas
- Filter by Bonus Stats: Health, Defense, Speed, Critical Rate
- Toggle view: Show only Pictos vs. Show only Luminas vs. Show both

### Build Summary Dashboard
- Picto Stats: Combined stats from 3 equipped Pictos
- Lumina Effects: List of active Lumina effects and total cost
- Total Character Stats: Picto stats + Lumina bonus stats
- Budget Status: Lumina points used/available

### Build Management
- Save builds to browser localStorage with custom names
- Load saved builds from a dropdown/list
- Delete saved builds
- Export build as shareable text/JSON
- Import build from text/JSON

## Troubleshooting

- If the planner doesn't load properly, make sure all files are in the same directory
- If the data doesn't appear, check that `picto-data.js` is properly formatted
- If you encounter issues with the data parser, check that `data.html` contains the expected HTML structure
- If saved builds don't appear, your browser may have localStorage disabled or full
