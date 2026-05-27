**Azure Redirects (BrightSwagShop frontend)**

- **Redirect URI to add (copy/paste exactly):**
  - https://brightswagshop-frontend.onrender.com/auth/callback.html

- **Where to add it in Azure:**
  - In the Azure Portal → Azure Active Directory → App registrations → Select your SPA app → "Authentication" → under "Redirect URIs" add the URI above and set the type to "Single-page application (SPA)".

- **Render / build settings (required):**
  - Ensure your frontend build uses this value at build time by setting the environment variable in Render (Service → Environment → `VITE_AZURE_REDIRECT_URI` = `/auth/callback.html` or full URL `https://brightswagshop-frontend.onrender.com/auth/callback.html`).
  - After updating the env var, trigger a deploy so Vite bakes the updated `VITE_` value into the build.

- **Why this exact URI:**
  - We provide a static document at `/auth/callback.html` that preserves the MSAL hash fragment and forwards the browser to `/` so the SPA can finish processing the auth response. Static hosts reliably serve real files (no rewrite required).

- **Optional temporary fallback:**
  - If you cannot update Azure immediately, you can add a hash-based redirect in the Azure app as a temporary fallback: `https://brightswagshop-frontend.onrender.com/#/auth/callback` (no build required), but prefer the `.html` approach for correctness.

**Notes**
- After adding the redirect in Azure and ensuring `VITE_AZURE_REDIRECT_URI` is set and the site is redeployed, test by signing in and confirming the browser ends up at `https://brightswagshop-frontend.onrender.com/` with MSAL completing the flow.
