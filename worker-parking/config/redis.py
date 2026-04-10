"""
Redis Configuration — Parking Worker
Manages connection to Redis for live parking count storage.
Owner: Infrastructure Team
"""

import os
from dotenv import load_dotenv

load_dotenv()

REDIS_HOST = os.getenv('REDIS_HOST', 'localhost')
REDIS_PORT = int(os.getenv('REDIS_PORT', 6379))
REDIS_DB = int(os.getenv('REDIS_DB', 0))

# TODO: initialize Redis client
# Example:
#   import redis
#   client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB)


def get_client():
    """Return the Redis client instance."""
    # TODO: return initialized Redis client
    raise NotImplementedError("Redis client not configured yet")
