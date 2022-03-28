## Getting Started

After cloning the repo, run:

```bash
npm install
```

to install dependencies. Next, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

By default, your server will make requests directly to 17Lands. You can optionally speed up development by using a Redis instance to cache results. Once you've set up your Redis instance, add the following line to `.env.local`:

```
REDIS_URL=<your Redis connection URL>
```

## Instructions for adding a new set

1. Add the new set to the `MagicSet` enum
2. Add a user-facing name for the set on `SET_LABELS` at `lib/constants.ts`
3. Add a start date for the set on `SET_START_DATES` at `lib/constants.ts`
4. Once Scryfall is updated, download the Oracle Cards data file [here](https://scryfall.com/docs/api/bulk-data) and update `data/scryfall-oracle-cards.json` in the repo
5. Update the root redirect in `next.config.js` to redirect to the latest set
6. Push to GitHub

For an example, see [this commit](https://github.com/youssefm/limited-grades/commit/282c8afe31b7115bc1399cc416be2150d33d8cdc).

# What's next

- Allow toggling columns?
- Search feature?
- Import just the SVGs we care about instead of the full mana/keyrune fonts?
- Start filters all off
- Improve filter button styling?
