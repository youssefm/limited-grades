# Limited Grades

Visualize MTG draft win rates as a tier list, powered by 17Lands data.

## Prerequisites

Node.js version 16

## Getting Started

After cloning the repo, run:

```
npm install
```

to install dependencies. Next, run the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

By default, your server will load cached data from the repository.

## Instructions for adding a new set

1. Upgrade the keyrune package by running `npm update keyrune` to get the latest SVGs for all the sets
2. Add a new static property on the `MagicSet` class at `src/lib/sets.ts` with the set code, the user-facing name of the set, the date the set was released on Arena, and the SVG for the set
3. Run your development server with `npm run dev`, head to [http://localhost:3000/admin](http://localhost:3000/admin), and run the `generate-scryfall-index` action
4. Update the root redirect in `next.config.js` to redirect to the latest set
5. Push to GitHub
