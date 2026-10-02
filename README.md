# Coach with Megha

Website for **Coach with Megha** online fitness coaching. It's a static site in plain **HTML, CSS and JavaScript** with no build step, hosted on **Vercel** from its own GitHub repository.

## Update the website (no coding needed)

All contact details and links are in **`js/config.js`**:

| Setting | What it does |
| --- | --- |
| `joinFormUrl` | Google Form link for every "Join now" / "Apply now" button. Until it's set, those buttons scroll to the Contact section. |
| `phoneDisplay` / `phoneLink` | Phone number shown on the site and used for the "Call" link |
| `whatsapp` / `whatsappMessage` | WhatsApp number (digits only, with country code) and the pre-filled message |
| `email` | Email address. The Email card stays hidden until you fill this in. |
| `instagram` | Instagram handle without the `@`. The Instagram card stays hidden until you fill this in. |

To edit it on GitHub: open `js/config.js`, click the ✏️ pencil icon, change the value between the quotes, then click **Commit changes**. Vercel redeploys within about a minute.

You can edit the page text (programs, FAQ, About) directly in `index.html` the same way.

## Deploy on Vercel (one-time setup)

1. Go to [vercel.com/new](https://vercel.com/new) and import the `coach-with-megha` GitHub repository.
2. Leave Root Directory as the default (`./`).
3. Leave Framework Preset as **Other**, with no build command.
4. Click **Deploy**. Every push to GitHub then updates the site automatically.
5. Optional: add your own domain (e.g. `coachwithmegha.com`) under Project → Settings → Domains.

## Run locally

```bash
python3 -m http.server 8080
```

## Files

```
index.html       The page: hero, about, programs, how it works, what's included, FAQ, contact
css/styles.css   All styling (colors and fonts are set at the top in :root)
js/config.js     Contact details and links ← edit this to update the site
js/main.js       Menu, scroll animations, FAQ and contact-link wiring
vercel.json      Vercel hosting config
```
