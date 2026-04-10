"""
Worker: Personalization — Flask Entry Point
Exposes API endpoints for re-ranking events based on user behavior and preferences.
Connects to: MySQL (user history, preferences)
Owner: ML/Data Team
"""

from flask import Flask
from routes.personalize import personalize_bp

app = Flask(__name__)

app.register_blueprint(personalize_bp)


@app.route('/ping', methods=['GET'])
def ping():
    return {"status": "personalization worker live"}


if __name__ == '__main__':
    import os
    from dotenv import load_dotenv
    load_dotenv()
    port = int(os.getenv('PORT', 6002))
    app.run(host='0.0.0.0', port=port, debug=True)
