# Davao Region School Exposure Analysis (AHP)

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Leaflet](https://img.shields.io/badge/Leaflet-199903?style=for-the-badge&logo=Leaflet&logoColor=white)

An interactive geospatial application designed to analyze and visualize the environmental exposure of schools in the Davao Region using the **Analytic Hierarchy Process (AHP)**. This project is based on a research paper I conducted, now transformed into a full-stack functional application.

## How to Run the Program

To run this project locally, follow these steps to start both the backend and the frontend.

### Server-Side (Python/FastAPI)
1. **Navigate and Run:**
   ```powershell
   cd server
   uvicorn main:app --reload

2. **Verify: Open your browser to the local link**. 
    It should display:
   ```text
   {"message": "AHP Server is Online"}
  Add these to the browser local link above to check the endpoints
  
  `/analyze`: View raw calculation results.

  `/map-data`: View raw school dataset.

---

### Client-Side (React/Vite)
1. **Navigate and Run:**
   ```text
   cd client
   npm run dev

2. **Access: Open the local URL** (usually `http://localhost:5173`) to view the site.

## Key Features
**Interactive Map & Layers**
   * Hazard Visualization: View **Active Faults** (Red Broken Lines) and **Major Rivers** (Blue Thick Lines).
   * School Exposure Markers: 50 schools (10 per province; 5 Public/5 Private) color-coded by exposure:
         * 🟢 Low | 🟡 Moderate | 🔴 High

**Control Panel**
   * Run AHP Analysis: Dynamically run an analysis based on toggled hazard layers.
   * Exposure Summary: Live tally of results across the region.
   * Top 10 Rankings: A list of the schools with the highest exposure indexes. Clicking a school name automatically zooms the map to its location.

## Data Sources & Methodology

This project utilizes geospatial data from various government and open-source providers. To maintain a lightweight repository, raw GIS files (Shapefiles, original CSVs) are hosted externally.

| Data Type | Source | Format |
| :--- | :--- | :--- |
| School Locations | DepEd / Open Data PH | GeoJSON / CSV |
| River Networks | NAMRIA / Humanitarian Data Exchange | Shapefile |
| Regional Boundaries | PSA / GADM | Shapefile |

### Proof of Process
You can access the raw, unclipped datasets and the QGIS project files used for data preparation here:
**[Download Raw GIS Data (Google Drive)](https://drive.google.com/drive/folders/1RItRtYV2x-UkKXj6-ocxIhM2aU3BbYc9?usp=sharing)**
