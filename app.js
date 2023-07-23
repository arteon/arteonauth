// Replace these values with your Auth0 credentials
const auth0Domain = 'thearteon.us.auth0.com';
const auth0ClientId = 'xr7GRbrmdpwZjkWkFXoP4r51KH9pfzUj';
const githubPagesUrl = 'https://arteon.github.io/arteonauth/';

function initializeAuth() {
    const auth0 = new auth0.WebAuth({
        domain: auth0Domain,
        clientID: auth0ClientId,
        redirectUri: githubPagesUrl,
        responseType: 'token id_token',
        scope: 'openid'
    });

    // Function to handle login
    function login() {
        auth0.authorize();
    }

    // Function to handle logout
    function logout() {
        auth0.logout({
            returnTo: githubPagesUrl
        });
    }

    // Function to check if the user is authenticated
    function checkAuth() {
        auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                // User is authenticated
                showContent();
            } else if (err) {
                console.log(err);
            } else {
                // User is not authenticated
                hideContent();
            }
        });
    }

    // Function to display the protected content
    function showContent() {
        document.getElementById('content').style.display = 'block';
    }

    // Function to hide the protected content
    function hideContent() {
        document.getElementById('content').style.display = 'none';
    }

    // Event listener for the login button
    document.getElementById('login-button').addEventListener('click', login);

    // Event listener for the logout button
    document.getElementById('logout-button').addEventListener('click', logout);

    // Check authentication status when the page loads
    checkAuth();
}

// Call the initialization function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeAuth);
