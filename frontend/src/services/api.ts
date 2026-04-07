import { msalInstance } from "../Config/AuthConfig";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  //get all accounts 
  const accounts = msalInstance.getAllAccounts();
//als niemand ingelogd is throw error 
  if (accounts.length === 0) {
    throw new Error("No user logged in");
  }
  //er was ook een andere manier om dit te doen ik moet de chats checken 
//acquire praat met de login service van Microsoft. die kijkt heeft deze user al een geldige token? zo ja geeft token terug 
  const token = await msalInstance.acquireTokenSilent({
    account: accounts[0],
    scopes: ["api://YOUR_API_CLIENT_ID/.default"],
  });
// deze fetch geef mij data en btw hier is mijn ID zodat je weet dat ik toegang heb 
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    },
  });
};