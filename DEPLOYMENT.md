# Deploying KIKOBA Web Admin to Vercel

Since your web application is located in the `web/` subdirectory of your repository, follow these specific steps to deploy successfully.

## 1. Push Code to GitHub
Ensure your latest changes are committed and pushed to your GitHub repository.
```bash
git add .
git commit -m "feat: complete web admin portal"
git push origin master
```

## 2. Import Project to Vercel
1.  Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Select your GitHub repository (`Maono_App` or whatever you named it) and click **Import**.

## 3. Configure Project Settings (CRITICAL)
Before clicking "Deploy", you must configure the following:

### A. Root Directory
Since your Next.js app is inside a folder, you must tell Vercel where to find it.
-   Find the **"Root Directory"** setting (click "Edit").
-   Select the **`web`** folder.
-   *Note: This will automatically detect Next.js.*

### B. Environment Variables
Copy these values from your local setup (or Firebase Console / EmailJS Dashboard) into the **Environment Variables** section.

| Variable Name | Description |
| :--- | :--- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Public API Key (Safe to expose) |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Project ID (e.g., `kikoba-app-28064`) |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Storage Bucket URL |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Messaging Sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | App ID |
| `FIREBASE_PROJECT_ID` | **(Server-Side)** Same as above |
| `FIREBASE_CLIENT_EMAIL` | **(Server-Side)** Service Account Email |
| `FIREBASE_PRIVATE_KEY` | **(Server-Side)** Private Key (Copy the whole string including `-----BEGIN...`) |
| `EMAILJS_SERVICE_ID` | EmailJS Service ID |
| `EMAILJS_TEMPLATE_ID` | EmailJS Template ID |
| `EMAILJS_PUBLIC_KEY` | EmailJS Public Key |
| `EMAILJS_PRIVATE_KEY` | EmailJS Private Key |
| `CRON_SECRET` | A random string for securing your cron job |

## 4. Deploy
-   Click **"Deploy"**.
-   Vercel will build your app. Since we verified `npm run build` locally, it should pass.
-   Once finished, you will get a live URL (e.g., `https://kikoba-web.vercel.app`).

## 5. Post-Deployment: Setup Cron Job
1.  Go to your Vercel Project Dashboard.
2.  Navigate to **Settings** -> **Cron Jobs**.
3.  You should see your `/api/cron/monthly-reminder` job listed there (detected automatically from `vercel.json` if it exists, or you may need to rely on Vercel's automatic detection of the route).
    *   *Note: Next.js App Router API routes are often automatically detected/triggered if configured correctly, but Vercel's Cron feature usually requires a `vercel.json` config.*

### Verify `vercel.json`
Ensure `d:\Maono_App\web\vercel.json` exists with this content:
```json
{
  "crons": [
    {
      "path": "/api/cron/monthly-reminder",
      "schedule": "0 9 25 * *"
    }
  ]
}
```
*This schedules the reminder at 9:00 AM on the 25th of every month.*
