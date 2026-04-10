"""
Scorer Service — Baseline Worker
Calculates distance and maps category weights to events.
Owner: Backend Team
"""

from config.db import get_connection

def calculate_baseline_score(user_lat, user_lon, radius_km=2.0):
    """
    Fetch events within a specific radius and apply initial category-based scoring.

    Args:
        user_lat (float): Latitude of the searching user.
        user_lon (float): Longitude of the searching user.
        radius_km (float): Search radius in kilometers. Defaults to 2.0km.

    Returns:
        list: A list of event objects with distance and baseline_score attached.
    """
    # TODO: Connect to MySQL via get_connection()
    # TODO: Query events joined with locations and categories
    # TODO: Implement Haversine distance formula to filter by radius
    # TODO: Map category_weight from the categories table as the initial score
    # TODO: Return structured list of nearby scored events
    return []
