# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## VPS Server Setup
USE THE FOLLOWING COMMANDS TO SET UP A VPS SERVER FOR HOSTING THE REACT APP
vps:4.211.135.250
username: debanjanofficial
password: ssh key

## VPS Folder Structure
- Portfolio (this project) deploys to `~/sites/portfolio/current` on the VPS. The symlink `~/build` also points here for backwards-compatible deployments.

## Authentication Setup
The app now relies on Auth0 to power the Google and LinkedIn sign-in buttons.

1. Create a **Single Page Application** in Auth0 and enable the **Google** (`google-oauth2`), **LinkedIn**, and **Facebook** connections.
2. Under *Applications → Settings*, add the following URLs:
   - Allowed Callback URLs: `https://debanjanchakraborty.dev` (plus `http://localhost:3000` for local dev).
   - Allowed Logout URLs: same as above.
   - Allowed Web Origins: include both URLs as well.
3. Copy the Auth0 domain and client ID into a `.env` file (see `.env.example`):
   ```
   REACT_APP_AUTH0_DOMAIN=your-tenant.us.auth0.com
   REACT_APP_AUTH0_CLIENT_ID=yourClientId
   ```
4. If you want the Google welcome email feature, configure [EmailJS](https://www.emailjs.com/) and add the IDs/keys shown in `.env.example`.
5. Restart `npm start` so CRA picks up the new environment variables, then redeploy with `npm run build`.

### Login Flow Notes
- The inline provider buttons on the Sign In screen act as **Sign Up**: they require first/last name before redirecting to Auth0.
- The bottom “Login” button opens a provider picker for returning users. If a user logs in without having signed up on this browser before, they’ll see an “Account not found” message.
- Known accounts (tracked in `localStorage`) unlock the one-click “Continue as …” shortcut and the dedicated login modal.
- Anonymous browsing is still available via the “Visit as Anonymous” chip in the top-right corner.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
