"""
Parking Route
Handles requests for parking lot availability near event venues.
Connects to: availability service
Owner: Infrastructure Team
"""

from flask import Blueprint, request, jsonify
from services.availability import get_availability

parking_bp = Blueprint('parking', __name__)


@parking_bp.route('/ping', methods=['GET'])
def ping():
    return jsonify({"status": "parking route live"})


@parking_bp.route('/parking', methods=['GET'])
def parking():
    venue_id = request.args.get('venue_id')
    # TODO: validate venue_id parameter
    # TODO: call get_availability and return lot data with live counts
    return jsonify({"message": "parking endpoint placeholder", "venue_id": venue_id})
