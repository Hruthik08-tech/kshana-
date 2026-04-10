"""
Worker: Parking Availability — Flask Entry Point
Exposes API endpoints for querying real-time parking lot availability.
Connects to: Redis (live counts), NoSQL (static lot metadata)
Owner: Infrastructure Team
"""

from flask import Flask
from routes.parking import parking_bp

app = Flask(__name__)

app.register_blueprint(parking_bp)


@app.route('/ping', methods=['GET'])
def ping():
    return {"status": "parking worker live"}


if __name__ == '__main__':
    import os
    from dotenv import load_dotenv
    load_dotenv()
    port = int(os.getenv('PORT', 6003))
    app.run(host='0.0.0.0', port=port, debug=True)
