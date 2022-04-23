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

By default, your server will load cached data from the repository.

## Instructions for adding a new set

1. Add a new static property on the `MagicSet` class at `src/lib/sets.ts` with the set code, the user-facing name of the set, the date the set was released on Arena, and the SVG for the set
2. Once Scryfall is updated, download the Oracle Cards data file [here](https://scryfall.com/docs/api/bulk-data) and update `data/scryfall-oracle-cards.json`
3. Update the root redirect in `next.config.js` to redirect to the latest set
4. Push to GitHub
