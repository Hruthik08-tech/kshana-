"""
Personalize Route
Accepts a scored event list and re-ranks it based on user-specific signals.
Connects to: ranker service
Owner: ML/Data Team
"""

from flask import Blueprint, request, jsonify
from services.ranker import rerank

personalize_bp = Blueprint('personalize', __name__)


@personalize_bp.route('/ping', methods=['GET'])
def ping():
    return jsonify({"status": "personalize route live"})


@personalize_bp.route('/personalize', methods=['POST'])
def personalize():
    data = request.get_json()
    # TODO: validate input (user_id, scored_events list)
    # TODO: call rerank with user profile and scored events
    return jsonify({"message": "personalize endpoint placeholder", "input": data})
