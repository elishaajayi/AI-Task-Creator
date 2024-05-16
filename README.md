# AI Task Creator

**Google AI Hackathon**  
Hosted by Devpost

## REQUIREMENTS

### WHAT TO BUILD

Build a creative app that uses Google’s Generative AI tools with Gemini!

### WHAT TO SUBMIT

- Provide a URL to your code repository for judging and testing.
- Include a video (about 3 minutes) that demonstrates your submission. Videos must be uploaded to YouTube, Vimeo, or Facebook Video and made public.
- Google Cloud Project ID
- Identify which Gemini API you are using (Google AI or Vertex AI)

## Project Description

The AI Task Creator is meant to be a portal to ease the process of planning. I envisioned it as a product that you wake up, speak to with voice to text and using Google's AI API, takes the input and creates a plan for the day from it. It uses the multi-chat conversational feature of Gemini AI to retain context in a session, rendering plans onto a Trello-like to-do list interface (was supposed to be calendar-styled dashboard).

## Technologies Used

- React Template (Vite)
- Google Gemini API

## How To Run

After cloning the repo, you can navigate to the project directory, then run:

```bash
npm install
```

Once installation is complete, you can run (if needed):

```bash
npm i dotenv nodemon express @google/generative-ai
```

This packages are needed for the backend.

```bash
npm run dev
```

to start the development server for the frontend, and

```bash
npm start
```

to start the development server for the backend.
<br>
You can use dev dependencies like concurrently to start both servers together as you like, but if you are not comfortable with that, create a new command prompt terminal in your code editor and start both servers separately.
<br>

Please note that you will need to get an API key from ai.google.dev and add it to a .env file in the root directory of ai-task-creator as shown:
```bash
GOOGLE_GEN_AI_HACKATHON_KEY=your_api_key
```
