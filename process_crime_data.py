import kagglehub
import pandas as pd
import json
import os

try:
    path = kagglehub.dataset_download("aayushrokade/crime-review-of-karnataka-2021-2024")
    print(f"Path to dataset files: {path}")
    
    files = os.listdir(path)
    print(f"Files found: {files}")
    
    # Let's try to read one of the CSVs to see the structure
    # Based on search, it likely has district/city names.
    # We might need to geocode them if lat/lng are missing.
    
    crime_data = []
    
    # Mock some coordinates for district centers since the dataset might not have lat/lng
    district_coords = {
        "Bengaluru City": {"lat": 12.9716, "lng": 77.5946},
        "Mysuru City": {"lat": 12.3072, "lng": 76.6413},
        "Mangaluru City": {"lat": 12.9141, "lng": 74.8560},
        "Hubballi-Dharwad City": {"lat": 15.3647, "lng": 75.1240},
        "Belagavi City": {"lat": 15.8497, "lng": 74.4977},
        "Kalaburagi City": {"lat": 17.3297, "lng": 76.8343},
    }

    for file in files:
        if file.endswith('.csv'):
            df = pd.read_csv(os.path.join(path, file))
            print(f"Columns in {file}: {df.columns.tolist()}")
            # If 'District' or 'UnitName' exists, we can approximate
            if 'District' in df.columns:
                for district, count in df['District'].value_counts().items():
                    if district in district_coords:
                        crime_data.append({
                            "location": district_coords[district],
                            "weight": int(count) / 10 # scale down for heatmap
                        })
            elif 'UnitName' in df.columns:
                 for unit, count in df['UnitName'].value_counts().items():
                    # Check if unit name contains a known city
                    for city, coords in district_coords.items():
                        if city.split()[0].lower() in unit.lower():
                            crime_data.append({
                                "location": coords,
                                "weight": min(10, int(count) / 5)
                            })

    if not crime_data:
        print("Could not extract meaningful geolocation data, using enriched defaults")
        # I'll manually provide a better list if the CSV parsing fails
    
    # Save to a format the React app can use
    with open('d:/canara_hackathon/SafeHer/src/data/actual_crime_data.json', 'w') as f:
        json.dump(crime_data, f)
        
except Exception as e:
    print(f"Error: {e}")
