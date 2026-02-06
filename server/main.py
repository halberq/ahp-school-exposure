from fastapi import FastAPI # Import neccesary libraries
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
import pandas as pd
import numpy as np 
import os # To check file existence

class AnalysisRequest(BaseModel): # Define request model for analysis endpoint
    weights: Dict[str, float]

app = FastAPI() # Initialize FastAPI app instance

origins = [
    "http://localhost:5173/",
    "http://127.0.0.1:5173/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__)) # Define base directory
DATA_FILE = os.path.join(BASE_DIR, "data", "Final_Hazard_Data.csv") # Define data file path, everytime DATA_FILE is used, it will refer to this path

def calculate_ahp_weights(matrix): # AHP weight calculation function
    column_sums = matrix.sum(axis=0)
    normalized_matrix = matrix / column_sums
    weights = normalized_matrix.mean(axis=1)
    return weights

@app.get("/") # Create root endpoint
def read_roots():
    return {"message": "AHP Server in Online"}

def get_processed_data(custom_weights = None):
    if not os.path.exists(DATA_FILE):
        return None
    
    df = pd.read_csv(DATA_FILE) 
    df.columns = df.columns.str.strip() # Clean column names

    if 'Latitude' not in df.columns or 'Longitude' not in df.columns:
        return {"error": "Missing 'Latitude' or 'Longitude' columns in CSV"}
    
    if custom_weights:
        weight_fault = custom_weights.get("Fault Proximity", 0.0) # Changes assigned weights based on enabled checkboxes
        weight_river = custom_weights.get("River Proximity", 0.0)

    else:
        pairwise_matrix = np.array([ # Define pairwise comparison matrix
            [1,   3], # 2x2 matrix for Fault vs River with their respective comparison weights
            [1/3, 1]   
        ])
    
        weights = calculate_ahp_weights(pairwise_matrix)
        weight_fault = float(weights[0]) 
        weight_river = float(weights[1])

    col_fault_dist = 'Fault_HubDist'
    col_river_dist = 'River_HubDist'

    df = df.dropna(subset = ['Latitude', 'Longitude', col_fault_dist, col_river_dist])

    df['Norm_Fault'] = (df[col_fault_dist].max() - df[col_fault_dist]) / (df[col_fault_dist].max() - df[col_fault_dist].min())
    df['Norm_River'] = (df[col_river_dist].max() - df[col_river_dist]) / (df[col_river_dist].max() - df[col_river_dist].min())

    df['Exposure_Index'] = (df['Norm_Fault'] * weight_fault) + (df['Norm_River'] * weight_river)

    def categorize_exposure(score):
        if score > 0.66: return 'High'
        elif score > 0.33: return 'Moderate'
        else: return 'Low'

    df['Exposure_Level'] = df['Exposure_Index'].apply(categorize_exposure)

    return df, weight_fault, weight_river

@app.get("/map-data") # Map data to be displayed on the frontend
def get_map_data():

    result = get_processed_data()
    if result is None:
        return ("error" ": " "Data File not found or missing coordinates")
    
    df, _, _ = result

    return df.where(pd.notnull(df), None).to_dict(orient='records')


@app.post("/analyze") # Create analyze endpoint
def analyze_exposure(request: AnalysisRequest):

    incoming_weights = request.weights
    print(f"User Selected: {incoming_weights}")

    result = get_processed_data(custom_weights=incoming_weights)
    if result is None:
        return ("error" ":" "Data File not found")
    
    df, w_fault, w_river = result

    stats = df['Exposure_Level'].value_counts().to_dict() # Get statistics of exposure levels

    col_location = 'Municipality / City'
    top_10 = df.sort_values(by='Exposure_Index', ascending=False).head(10) # Get top 10 riskiest schools
    top_10_list = top_10[['School Name', col_location, 'Exposure_Index', 'Exposure_Level', 'Latitude', 'Longitude']].to_dict(orient='records') # Convert to list of dictionaries

    full_map_data = df.where(pd.notnull(df), None).to_dict(orient='records') # Get full map data for frontend

    return {
        "status": "success", # Return success status
        "ahp_weights": {
            "fault_proximity": w_fault,
            "river_proximity": w_river
        },
        "statistics": stats,
        "top_10_riskiest_schools": top_10_list,
        "full_map_data": full_map_data
    }
    


    