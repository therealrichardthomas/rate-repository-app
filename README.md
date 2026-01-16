# Rate Repository App

A full-stack React Native mobile application for browsing, rating, and reviewing code repositories. Built with Expo, it features user authentication, GraphQL data fetching, and a cross-platform design.

## 🚀 Features

* **Repository Browsing**: View a list of repositories with key metrics (stars, forks, rating, reviews).
* **User Authentication**: Secure Sign In and Sign Up functionality.
* **Single Repository View**: Access detailed information and reviews for specific repositories.
* **Review System**: Users can post reviews and ratings for repositories.
* **My Reviews**: Manage and view your own submitted reviews.
* **Cross-Platform Support**: Optimized for Android, iOS, and Web.

## 🛠️ Tech Stack

* **Framework**: [React Native](https://reactnative.dev/) via [Expo](https://expo.dev/)
* **Data Fetching**: [Apollo Client](https://www.apollographql.com/docs/react/) (GraphQL)
* **Routing**: [React Router Native](https://reactrouter.com/)
* **Forms**: [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup) for validation
* **UI Components**: [React Native Paper](https://callstack.github.io/react-native-paper/)
* **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/)
* **Linting**: ESLint

## 📋 Prerequisites

* [Node.js](https://nodejs.org/) (LTS recommended)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [Expo Go](https://expo.dev/client) on your mobile device (for physical device testing)

## 🔙 Backend Initialization

This application requires a local backend server to function. The backend API is provided by the [Rate Repository API](https://github.com/fullstack-hy2020/rate-repository-api).

**Before running the app, please set up the backend:**

1.  Open a new terminal window.
2.  Clone the backend repository:
    ```bash
    git clone [https://github.com/fullstack-hy2020/rate-repository-api.git](https://github.com/fullstack-hy2020/rate-repository-api.git)
    cd rate-repository-api
    ```
3.  Install dependencies and start the server:
    ```bash
    npm install
    npm start
    ```
    *The API will start on `http://localhost:5000` and the Apollo Server on `http://localhost:4000`.*

## ⚙️ Installation & Configuration

1.  **Clone this repository:**
    ```bash
    git clone <your-repo-url>
    cd rate-repository-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    This project uses `dotenv` for configuration. Create a `.env` file in the root directory:
    ```env
    ENV=development
    # Use your machine's local IP address if testing on a physical device (e.g., [http://192.168.1.5:4000/graphql](http://192.168.1.5:4000/graphql))
    # Use http://localhost:4000/graphql for web or simulator
    APOLLO_URI=http://localhost:4000/graphql
    ```

## 🏃‍♂️ Running the App

Start the Expo development server:

```bash
npm start
```

## Platform Specific Commands

### Android
```bash
npm run android
```

### iOS (Requires macOS & Xcode)
```bash
npm run ios
```

### Web
```bash
npm run web
```

## 🧪 Testing & Code Quality

### Running Tests
Execute the Jest test suite to verify component logic and behavior:
```bash
npm test
```

### Linting
Check the codebase for stylistic and programmatic errors using ESLint:
```bash
npm run lint
```

## 📂 Project Structure

* **`src/components/`**: UI components (RepositoryList, SignIn, ReviewForm, etc.)
* **`src/graphql/`**: GraphQL query and mutation definitions
* **`src/hooks/`**: Custom hooks for logic reuse (useRepositories, useSignIn)
* **`src/utils/`**: Utilities for storage and Apollo Client configuration
* **`src/theme.js`**: Application-wide theme configuration
* **`app.config.js`**: Expo configuration