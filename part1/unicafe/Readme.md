# React + Vite
This React application is a simple anecdote app that allows users to view random anecdotes, vote on them, and provide feedback. It also displays statistics about the feedback given, including the total number of good, neutral, and bad feedback, the overall average feedback, and the percentage of positive feedback.

## Tech Stack
* React
* Vite (for fast development)
* Tailwind CSS (for styling)

## Key Features:
- Anecdote Display: Displays a random anecdote from a list.
- Voting: Allows users to vote on the displayed anecdote.
- Most Voted Anecdote: Shows the anecdote with the highest number of votes.
- Feedback: Users can provide feedback (good, neutral, bad) on the displayed anecdote.
- Statistics: Displays statistics about the feedback given, including: 
   - Total number of good, neutral, and bad feedback 
   - Total number of all feedback average feedback (good - bad) / all
   - Percentage of good feedback (good / all) * 100

## Components:
1. App: The main component that orchestrates the application.
2. Anecdotes: Displays the selected anecdote, the vote button, and the "New Anecdote" button.
3. MostVoted: Displays the anecdote with the most votes.
4. Statistics: Displays the feedback statistics.
5. Button: A reusable component for creating buttons with different styles.
6. StatTable: A reusable component for displaying the statistics in a table format.

## Data Structure:
- anecdotes: An array of strings, each representing an anecdote.
- voteReceived: An array of numbers, where each number represents the vote count for the corresponding anecdote.
- good, neutral, bad, all, average, percentage: State variables in the App component to store the feedback statistics.

## Functionality:
* Anecdote Selection:
   * The "New Anecdote" button randomly selects an anecdote from the anecdotes array and displays it.
* Voting:
   * Clicking the "vote" button increments the vote count for the currently displayed anecdote.
* Most Voted Anecdote:
   * The MostVoted component sorts the anecdotes based on their vote count and displays the anecdote with the highest vote count.
* Feedback:
   * Users can click the "good," "neutral," or "bad" buttons to provide feedback on the displayed anecdote.
   * The feedback counts are stored in the voteReceived state.
* Statistics:
   * The Statistics component calculates and displays the feedback statistics based on the values in the good, neutral, bad, all, average, and percentage state variables.