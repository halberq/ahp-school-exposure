# Geospatial Mapping of Educational Exposure

An interactive geospatial application designed to analyze and visualize the environmental exposure of schools in the Davao Region using the **Analytic Hierarchy Process (AHP)**. This project is based off a research paper I did for school, which I turned into a full-stack application 

## How to Run the Program

To run this project locally, follow these steps to start both the backend and the frontend.

### Server-Side (Python/FastAPI)
1. **Run these commands**
   ```powershell
   cd server
   uvicorn main:app --reload

**Verify the connection: Click the link in your terminal. It should display:** 
    ```powershell
    {"message":"AHP Server is Online"}.



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