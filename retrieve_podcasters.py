
import requests
from googleapiclient.discovery import build

# Set up YouTube Data API
youtube = build('youtube', 'v3', developerKey='AIzaSyANFIjdlNGmsQt0Or_vWkRaIG_H4iEW2ms')


extracted_data = ""  # Initialize the variable outside the function

def search_podcasts(query, max_results=500):
    # Set the number of results per page
    results_per_page = 50
    num_pages = (max_results - 1) // results_per_page + 1

    # Initialize a list to store all results
    all_results = []
    extracted_data = ""  # Initialize the variable outside the function


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

        # Print information about the podcast
        # extracted_data.append(f'{{channel: "{channel_title}", channelViewCount: "{channel_view_count}", subscriberCount: "{subscriber_count}", country: "{country}"}}')
        extracted_data = extracted_data + (f'{{"channel": "{channel_title}", "channelViewCount": "{channel_view_count}", "subscriberCount": "{subscriber_count}", "country": "{country}"}}, ')

        # print(f'{{channel: "{channel_title}", channelViewCount: "{channel_view_count}", subscriberCount: "{subscriber_count}", country: "{country}"}},')
    print(f'[{extracted_data[:-2]}]')

    return extracted_data
# final=search_podcasts('podcast')
if __name__ == "__main__":

    search_podcasts('podcast')