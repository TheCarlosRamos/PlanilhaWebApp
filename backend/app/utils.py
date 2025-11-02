import pandas as pd
import re

URL_REGEX = re.compile(r"(https?://[^\s]+)")

def extract_first_url(text):
    if not text or (not isinstance(text, str)):
        return None
    m = URL_REGEX.search(text)
    if m:
        return m.group(1)
    return None

def excel_to_records(file_path):
    # Ler todas as abas da planilha
    excel_file = pd.ExcelFile(file_path)
    records = []
    row_counter = 1
    
    for sheet_name in excel_file.sheet_names:
        df = pd.read_excel(excel_file, sheet_name=sheet_name, dtype=str)
        df.fillna('', inplace=True)
        
        for idx, row in df.iterrows():
            data = row.to_dict()
            
            # Adicionar informação sobre qual aba o registro vem
            data['_aba_origem'] = sheet_name
            
            # Procurar link na linha
            link = None
            for col in data:
                if 'link' in col.lower() and data[col]:
                    link = extract_first_url(str(data[col])) or data[col]
                    break
            if not link:
                for v in data.values():
                    u = extract_first_url(str(v))
                    if u:
                        link = u
                        break
            
            records.append({
                'row_number': row_counter,
                'data': data,
                'link': link
            })
            row_counter += 1
    
    return records
