import requests
import os
import json
from dotenv import load_dotenv
from googleapiclient.discovery import build

# Load environment variables from .env file
load_dotenv()

# Set up YouTube Data API
secret_key = os.getenv('API_KEY')
youtube = build('youtube', 'v3', developerKey=secret_key)

def search_podcasts(query, max_results=500):
    # Set the number of results per page
    results_per_page = 50
    num_pages = (max_results - 1) // results_per_page + 1

    # Initialize a list to store all results
    all_results = []

    # Process each page of results
    for page in range(num_pages):
        # Calculate the index of the first result for this page
        start_index = page * results_per_page + 1

        # Call the search.list method to search for podcasts
        search_response = youtube.search().list(
            q=query + ' technology',
            part='snippet',
            type='video',
            maxResults=results_per_page,
            pageToken=None if page == 0 else next_page_token,  # Set the page token for pagination
        ).execute()

        # Append results from this page to the all_results list
        all_results.extend(search_response.get('items', []))

        # Get the page token for the next page of results
        next_page_token = search_response.get('nextPageToken')

        # Stop fetching results if we've reached the maximum requested results or if there are no more pages
        if next_page_token is None or len(all_results) >= max_results:
            break

    # Initialize a list to store extracted podcast data
    extracted_data = []

    # Process all results
    for search_result in all_results[:max_results]:
        # Extract video details
        video_id = search_result['id']['videoId']

        # Call the videos.list method to retrieve view count
        video_response = youtube.videos().list(
            part='statistics',
            id=video_id
        ).execute()

        # Extract view count
        view_count = video_response['items'][0]['statistics']['viewCount']

        # Call the videos.list method to retrieve channel ID
        channel_id = search_result['snippet']['channelId']

        # Call the channels.list method to retrieve channel details
        channel_response = youtube.channels().list(
            part='snippet,statistics',
            id=channel_id
        ).execute()

        # Extract channel details
        channel_title = str(channel_response['items'][0]['snippet']['title'])
        channel_view_count = channel_response['items'][0]['statistics']['viewCount']
        subscriber_count = channel_response['items'][0]['statistics']['subscriberCount']
        country = channel_response['items'][0]['snippet'].get('country', 'Unknown')

        # Append extracted podcast data to the list
        extracted_data.append({
            "channel": channel_title,
            "channelViewCount": channel_view_count,
            "subscriberCount": subscriber_count,
            "country": country
        })

    # Convert the list of extracted data to a JSON string
    json_output = json.dumps(extracted_data, indent=2)

    # Print the JSON output
    print(json_output)

    return json_output

if __name__ == "__main__":
    # Run the search function with the desired query
    search_podcasts('podcast')
