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

1. Upgrade the keyrune package to get the latest SVGs for all the sets
2. Add a new static property on the `MagicSet` class at `src/lib/sets.ts` with the set code, the user-facing name of the set, the date the set was released on Arena, and the SVG for the set
3. Once Scryfall is updated, download the Oracle Cards data file [here](https://scryfall.com/docs/api/bulk-data) and move it to `data/scryfall-oracle-cards.json`
4. Run your development server with `npm run dev`, head to [http://localhost:3000/admin](http://localhost:3000/admin), and run the `generate-scryfall-index` action
5. Delete `data/scryfall-oracle-cards.json`
6. Update the root redirect in `next.config.js` to redirect to the latest set
7. Push to GitHub
