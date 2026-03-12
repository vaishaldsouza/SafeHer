import kagglehub
import pandas as pd
import os

path = kagglehub.dataset_download("aayushrokade/crime-review-of-karnataka-2021-2024")
files = [f for f in os.listdir(path) if f.endswith('.csv')]
for file in files:
    print(f"\n--- {file} ---")
    df = pd.read_csv(os.path.join(path, file))
    print(df.head())
    print(df.columns)
