import os
from dotenv import load_dotenv
import praw
from flask import Flask, jsonify, request
from flask_cors import CORS  

# Load environment variables from the .env file
load_dotenv()

# Create a Flask app
app = Flask(__name__)

CORS(app)

# Set up the Reddit API client
def get_reddit_instance():
    return praw.Reddit(
        client_id=os.getenv("REDDIT_CLIENT_ID"),
        client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
        user_agent=os.getenv("REDDIT_USER_AGENT", "Reddit Keyword Search Tool")
    )

# Function to search a subreddit for posts containing keywords
def search_subreddit(reddit, subreddit_name, keywords, post_limit=20):
    try:
        subreddit = reddit.subreddit(subreddit_name)
        results = []

        # Fetch posts and filter by keywords
        for post in subreddit.hot(limit=post_limit):
            if any(keyword.lower() in (post.title + post.selftext).lower() for keyword in keywords):
                results.append({
                    "title": post.title,
                    "url": post.url,
                    "score": post.score,
                    "comments": post.num_comments,
                    "author": post.author.name if post.author else "N/A",
                    "created_utc": post.created_utc
                })

        return results
    except Exception as e:
        print(f"Error searching subreddit '{subreddit_name}': {e}")
        return []

# API endpoint to perform the Reddit search
@app.route('/api/search', methods=['GET'])
def search():
    subreddit_name = request.args.get('subreddit')
    keywords = request.args.get('keywords')
    post_limit = request.args.get('limit', default=20, type=int)

    if not subreddit_name or not keywords:
        return jsonify({"error": "Subreddit and keywords are required!"}), 400

    keywords = [keyword.strip() for keyword in keywords.split(",")]
    
    reddit = get_reddit_instance()
    results = search_subreddit(reddit, subreddit_name, keywords, post_limit)

    return jsonify({"results": results})

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
