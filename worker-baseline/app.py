"""
Worker: Baseline — Flask Entry Point
Initializes the Flask app and registers discovery-related routes.
Connects to: MySQL (events, locations)
Owner: Backend Team
"""

from flask import Flask
from routes.baseline import baseline_bp

app = Flask(__name__)

# Register Blueprints
app.register_blueprint(baseline_bp)

@app.route('/health', methods=['GET'])
def health():
    return {"status": "healthy", "worker": "baseline"}

if __name__ == '__main__':
    import os
    from dotenv import load_dotenv
    load_dotenv()
    
    port = int(os.getenv('PORT', 6001))
    app.run(host='0.0.0.0', port=port, debug=True)
