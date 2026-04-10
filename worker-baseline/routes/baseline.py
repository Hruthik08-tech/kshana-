"""
Baseline Route
Handles general discovery requests and initiates the scoring pipeline.
Owner: Backend Team
"""

from flask import Blueprint, request, jsonify
from services.scorer import calculate_baseline_score

baseline_bp = Blueprint('baseline', __name__)

@baseline_bp.route('/ping', methods=['GET'])
def ping():
    return jsonify({"status": "baseline worker live"})

@baseline_bp.route('/discover', methods=['POST'])
def discover():
    """
    Primary endpoint for discovering nearby events.
    Expected JSON: { "user_id": 1, "lat": 12.97, "lon": 77.59, "radius": 2.0 }
    """
    data = request.get_json()
    
    # TODO: Validate input presence (lat, lon, user_id)
    # TODO: Call calculate_baseline_score(lat, lon, radius)
    # TODO: Forward scored results to Personalization Worker if needed
    
    return jsonify({
        "message": "Discovery baseline processing placeholder",
        "received": data
    })
