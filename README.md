
# Task Timer App

A task management app that allows users to create, manage, and track tasks using notifications with action buttons for completion or skipping tasks.


## Features

### 1. **Authentication**
- **Login Form**: Users can log in with a username and password, validation is implemented using zod.
- **Secure Token Storage**: Authentication tokens are securely stored using `expo-secure-store`.
- **Error Handling**: Handles errors gracefully during login attempts.
- **Token Validation**: On app startup, the app checks for valid tokens to keep users logged in.
- **Bonus**: 
    - **Refresh Token**: Automatically refreshes access tokens when expired to maintain session without forcing users to log in again.
   

### 2. **Task Room Management**
- **Create Task Room**: A button that allows users to create new task rooms.
- **Room ID Display**: Displays the current room’s unique ID for reference.
- **Task List**: A list showing all tasks associated with the current task room.
- **Bonus**: 
    - **Pull-to-Refresh**: A pull-down gesture to refresh the task list for real-time updates.

### 3. **Task Management**
- **Get Next Task**: A button that fetches and displays the next available task for the user.
- **Task Details**: Displays task title and start time.
- **Task Notifications**:
    - Sends local notifications based on the time remaining (`starts_in`) for each task.
    - Notifications display the task title and offer two action buttons: "Done" and "Skip".
    - Both actions dismiss the notification when tapped.

## Bonus Features
1. **Secure Token Storage**: Uses `expo-secure-store` to safeguard user tokens.
2. **Token Refresh**: Automatically refreshes access tokens to prevent session expiration.
3. **Pull-to-Refresh**: Refresh the task list to reflect the most up-to-date tasks.
4. **State Mangement**: State mangement is done using zustand for persistent storage as well.
5. **Validation**: Form validation using custom hooks and zod.

## Tech Stack

Expo, React Native, Expo-notfication, Expo-secure-storage, Tanstack Query, Zod, Zustand, axios

## Demo
Below is the link to the GitHub repository and a screen recording of the app's functionality:

## Screen Recording
You can view the screen recording of the app here:  
[Screen Recording on Google Drive](https://drive.google.com/file/d/1tPeZe0Ju5sj6u7x59Y3BwggG4rqevMVM/view?usp=sharing)

## Installation

To run the Task Timer App on your device, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/ShagunDubey1/task-timer.git
```

    
### 2. Install dependencies:

```bash
    npm Install
```

### 3. Set up environment variables:

Create a .env file in the root directory and add the following:

```bash
    EXPO_PUBLIC_BASE_URL = 'your base url'
    EXPO_PUBLIC_API_URL = 'your api url'
```

### 4. Install Expo CLI (if not installed)

```bash
    npm install -g expo-cli
```

### 5. Install Expo Dev Client

```bash
    expo install expo-dev-client
```


### 6. Configure Expo EAS (Expo Application Services)
(required for project ID)

```bash
    eas build:configure
```

### 7. Build the Development Client:
To install and test the development client on your physical device:

```bash
   eas build --profile development --platform android
   or
   eas build --profile development --platform ios
```
### or

### 8. Run the app on simulator or expo go

```bash
   npx expo start
```

# Technical Decisions
- expo-notifications: Handles scheduling and displaying task notifications with actionable buttons.
- TanStack Query (React Query): Manages asynchronous data fetching, caching, and updating for tasks.
- Pull-to-Refresh: Implemented for efficient task list updates using React Native's FlatList.
- State Management: Utilizes Zustand and zod to manage user authentication and task data and for validation.

# Assumptions
- Users will create a task rooms before managing tasks.
- Notifications will provide feedback to users with actionable buttons.
