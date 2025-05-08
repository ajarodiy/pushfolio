import os
from dotenv import load_dotenv
from google.cloud import firestore
from google.oauth2 import service_account

load_dotenv()

key_path = os.getenv("FIREBASE_CREDENTIAL_PATH")
if not key_path:
    raise Exception("FIREBASE_CREDENTIAL_PATH is not set in .env")

cred = service_account.Credentials.from_service_account_file(key_path)
db = firestore.Client(credentials=cred, project=cred.project_id)
