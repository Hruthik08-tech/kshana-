"""
NoSQL Configuration — Parking Worker
Manages connection to NoSQL database for static parking lot metadata.
Owner: Infrastructure Team
"""

import os
from dotenv import load_dotenv

load_dotenv()

NOSQL_URI = os.getenv('NOSQL_URI', 'mongodb://localhost:27017')
NOSQL_DB = os.getenv('NOSQL_DB', 'fantom_parking')

# TODO: initialize NoSQL client (e.g., pymongo for MongoDB)
# Example:
#   from pymongo import MongoClient
#   client = MongoClient(NOSQL_URI)
#   db = client[NOSQL_DB]


def get_db():
    """Return the NoSQL database instance."""
    # TODO: return initialized database handle
    raise NotImplementedError("NoSQL client not configured yet")
