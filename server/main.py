from fastapi import FastAPI # Import neccesary libraries
import pandas as pd
import numpy as np 
import os # To check file existence

app = FastAPI() # Initialize FastAPI app instance

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

@app.get("/analyze") # Create analyze endpoint
def analyze_exposure():
    pairwise_matrix = np.array([ # Define pairwise comparison matrix
        [1,   3], # 2x2 matrix for Fault vs River with their respective comparison weights
        [1/3, 1]   
    ])
    
    weights = calculate_ahp_weights(pairwise_matrix)
    weight_fault = float(weights[0]) 
    weight_river = float(weights[1])

    if not os.path.exists(DATA_FILE): # Check if data file exists
        return {"error": "CSV file not found"}

    df = pd.read_csv(DATA_FILE) 
    df.columns = df.columns.str.strip() # Clean column names

    col_fault_dist = 'Fault_HubDist'
    col_river_dist = 'River_HubDist'
    col_location = 'Municipality / City'

    df['Norm_Fault'] = (df[col_fault_dist].max() - df[col_fault_dist]) / (df[col_fault_dist].max() - df[col_fault_dist].min())
    df['Norm_River'] = (df[col_river_dist].max() - df[col_river_dist]) / (df[col_river_dist].max() - df[col_river_dist].min())

    df['Exposure_Index'] = (df['Norm_Fault'] * weight_fault) + (df['Norm_River'] * weight_river)

    def categorize_exposure(score):
        if score > 0.66: return 'High'
        elif score > 0.33: return 'Moderate'
        else: return 'Low'

    df['Exposure_Level'] = df['Exposure_Index'].apply(categorize_exposure) # Categorize exposure levels

    top_10 = df.sort_values(by='Exposure_Index', ascending=False).head(10) # Get top 10 riskiest schools
    top_10_list = top_10[['School Name', col_location, 'Exposure_Index', 'Exposure_Level']].to_dict(orient='records') # Convert to list of dictionaries

    stats = df['Exposure_Level'].value_counts().to_dict() # Get statistics of exposure levels

    return {
        "status": "success", # Return success status
        "ahp_weights": {
            "fault_proximity": weight_fault,
            "river_proximity": weight_river
        },
        "statistics": stats,
        "top_10_riskiest_schools": top_10_list
    }