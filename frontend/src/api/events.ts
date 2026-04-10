/**
 * API service for event-related operations.
 * Handles fetching list of events, categories, and individual event details.
 */

const BASE_URL = 'http://localhost:5000/api/events';

export interface Event {
  id: string;
  title: string;
  description: string;
  rating: number;
  price: number;
  date: string;
  start_time: string;
  end_time: string;
  location_address: string;
  category_name: string;
  available_seats: number;
}

export interface Category {
  category_id: number;
  category_name: string;
  event_count: number;
}

/**
 * Fetches all events from the backend API.
 * @returns Promise<Event[]>
 */
export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetch(`${BASE_URL}/`);
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error;
  }
};

/**
 * Fetches all event categories from the backend API.
 * @returns Promise<Category[]>
 */
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }
};
