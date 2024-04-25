cd app/templates && npm run dev && cd ../../
export FLASK_APP=smmry.py
export FLASK_ENV=development
export NEWSAPIKEY='YourNewsApiKeyHere'
flask run --host 0.0.0.0
