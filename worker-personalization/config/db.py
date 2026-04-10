"""
Database Configuration — Personalization Worker
MySQL connection pool using mysql-connector-python.
Owner: ML/Data Team
"""

import os
import mysql.connector
from mysql.connector import pooling
from dotenv import load_dotenv

load_dotenv()

db_config = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', ''),
    'database': os.getenv('DB_NAME', 'fantom_db'),
}

pool = pooling.MySQLConnectionPool(
    pool_name='personalization_pool',
    pool_size=5,
    **db_config
)


def get_connection():
    """Return a connection from the pool."""
    return pool.get_connection()
