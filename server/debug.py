import pandas as pd
import os

# Define path to data
csv_path = os.path.join(os.path.dirname(__file__), "data", "Final_Hazard_Data.csv")

try:
    df = pd.read_csv(csv_path)
    print("\n--- DIAGNOSTIC RESULTS ---")
    print(f"Successfully loaded: {csv_path}")
    print("Here are the EXACT column names Python sees (look for extra spaces!):")
    print("-" * 30)
    for col in df.columns:
        print(f"'{col}'")  # We put quotes around them so you can see hidden spaces
    print("-" * 30)
except Exception as e:
    print(f"Error loading file: {e}")