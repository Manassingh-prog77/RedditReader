# Reddit Reader

Reddit Reader is an application that allows users to search Reddit posts based on subreddit and keywords. It leverages a Flask backend to fetch Reddit data and a Vite-powered React frontend to display the results.

## Folder Structure

```
RedditBot/
  ├── Project/              # Frontend (React app using Vite)
  │   ├── src/              # Source code for frontend
  │   ├── public/           # Public assets
  │   ├── package.json      # Dependencies and scripts for frontend
  │   ├── .env              # Environment variables for frontend (optional)
  │   └── README.md         # Documentation for frontend
  └── backend/              # Backend (Flask API)
      ├── redditBackend.py  # Python file to run the Flask backend
      └── .env              # Environment variables for backend
```

## Features

- Search Reddit posts based on subreddit and keywords.
- View results including post title, author, score, comments, and creation time.
- Pagination to navigate through large sets of search results.

## Frontend (React)

The frontend is built using React and Vite. It fetches data from the backend and displays search results.

### Installation

1. Go to the `Project` folder (frontend directory):
    ```bash
    cd RedditBot/Project
    ```

2. Install the necessary dependencies using npm:
    ```bash
    npm install
    ```

3. Start the development server to run the frontend:
    ```bash
    npm run dev
    ```

4. The frontend will be accessible at `http://localhost:3000`.

## Backend (Flask API)

The backend is built using Flask and is responsible for fetching data from Reddit using the Reddit API.

### Installation

1. Go to the `backend` folder (backend directory):
    ```bash
    cd RedditBot/backend
    ```

2. Create a `.env` file in the backend directory to store your Reddit API credentials:
    ```plaintext
    REDDIT_CLIENT_ID=your_reddit_client_id
    REDDIT_CLIENT_SECRET=your_reddit_client_secret
    REDDIT_USER_AGENT=your_reddit_user_agent
    ```

3. Install the required Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Run the backend server:
    ```bash
    python redditBackend.py
    ```

5. The backend API will be running on `http://localhost:5000`.

## Usage

Once both the frontend and backend are running, you can:

- Enter a subreddit name (e.g., `learnpython`) and keywords (comma-separated) in the frontend search form.
- The results will be displayed with post titles, authors, scores, comments, and creation times.
- Navigate through multiple pages of results using the pagination buttons.

## Environment Variables

Make sure to set the following environment variables in both frontend and backend:

### Frontend (`Project/.env`):
- You may need to configure environment variables for any custom setup. However, by default, no special variables are required for the frontend.

### Backend (`backend/.env`):
- `REDDIT_CLIENT_ID`: Your Reddit API client ID.
- `REDDIT_CLIENT_SECRET`: Your Reddit API client secret.
- `REDDIT_USER_AGENT`: A user agent string for your Reddit API requests.
```
