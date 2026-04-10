"""
Availability Service
Manages real-time parking counts using Redis INCR/DECR operations.
Reads static lot metadata from NoSQL.
Connects to: Redis (config/redis.py), NoSQL (config/nosql.py)
Owner: Infrastructure Team
"""


def get_availability(venue_id):
    """
    Fetch current parking availability for all lots near a venue.

    Args:
        venue_id (str): The venue identifier to look up nearby lots.

    Returns:
        list: Parking lots with capacity and current available count.
    """
    # TODO: query NoSQL for static lot metadata (name, location, total capacity)
    # TODO: read live occupied count from Redis for each lot
    # TODO: compute available = capacity - occupied
    return []


def increment_occupied(lot_id):
    """Record a vehicle entering a lot (Redis INCR)."""
    # TODO: INCR lot:<lot_id>:occupied in Redis
    pass


def decrement_occupied(lot_id):
    """Record a vehicle leaving a lot (Redis DECR)."""
    # TODO: DECR lot:<lot_id>:occupied in Redis, floor at 0
    pass
