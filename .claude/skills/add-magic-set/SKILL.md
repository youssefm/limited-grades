---
name: add-magic-set
description: "Add a new Magic: The Gathering set to the project. Use when asked to add a new MTG set, expansion, or draft format. Involves researching the set on mtg.wiki, downloading its SVG icon from Scryfall, adding a static entry in MagicSet.tsx, adding icon data in setIconPaths.ts, and updating the Next.js redirect config."
disable-model-invocation: true
argument-hint: "[set-name]"
---

# Skill: Add a New Magic Set to Limited Grades

Use this skill when the user asks to add a new Magic: The Gathering set to the project. This involves researching the set, downloading its SVG icon, adding a static entry in `MagicSet.tsx`, adding icon path data in `setIconPaths.ts`, and updating the Next.js redirect config.

## Architecture Overview

Set icon SVG data is **not** stored inline in `MagicSet.tsx`. Instead, it lives in a separate file (`setIconPaths.ts`) that is **dynamically imported** at runtime for code splitting. This keeps the initial JS bundle small — only the current page's icon is loaded eagerly via `getStaticProps`, while all other icons load asynchronously in the background.

Key files in the icon system:
- `src/lib/MagicSet.tsx` — set metadata and the `SetIcon` component (no SVG data)
- `src/lib/setIconPaths.ts` — all SVG path data, keyed by `[MagicSet.SET_NAME.code]`
- `src/lib/setIconLoader.ts` — cached async loader that dynamically imports `setIconPaths.ts`
- `src/lib/SetIconDataContext.ts` — React context for the eagerly-loaded current page icon
- `src/pages/[setCode].tsx` — passes the current set's icon data via `getStaticProps`

## Step-by-step Process

### Step 1: Research the Set on mtg.wiki

Use `fetch_webpage` to look up the set on mtg.wiki and find key information:

```
fetch_webpage({
  urls: ["https://mtg.wiki/page/<SetName>"],
  query: "MTG Arena release date, set code, set name"
})
```

- Find the **MTG Arena release date** (this is the `startDate` used in the constructor)
- Confirm the **set code** (the short lowercase code like `dsk`, `blb`, `mkm`, etc.)
- Confirm the **full set name**

If the wiki page uses underscores in the URL for multi-word set names, try that format (e.g., `https://mtg.wiki/page/Wilds_of_Eldraine`).

### Step 2: Download the Set SVG from Scryfall

Use `fetch_webpage` to get the SVG content:

```
fetch_webpage({
  urls: ["https://svgs.scryfall.io/sets/<setCode>.svg"],
  query: "SVG path data"
})
```

The SVG will contain `<path>` elements with `d` attributes. Extract:

- The `viewBox` attribute from the `<svg>` element
- All `<path d="...">` values (just the `d` attribute strings)

### Step 3: Add a New Static Entry in MagicSet.tsx

Edit `src/lib/MagicSet.tsx` to add a new static field. The entry should be placed at the **top** of the static fields (just after the class fields and before the existing first set), since sets are ordered newest-first.

**Important:** The constructor does not take an SVG icon parameter. SVG data goes in `setIconPaths.ts` (Step 4).

#### Basic constructor signature:

```tsx
static SET_NAME = new MagicSet(
  "setCode",           // lowercase set code (e.g., "dsk")
  "Display Name",      // human-readable name (e.g., "Duskmourn")
  "YYYY-MM-DD",        // MTG Arena release date
  // Optional parameters below — omit to use defaults:
  // decks: defaults to Deck.TWO_COLOR_DECKS
  // format: defaults to Format.PREMIER_DRAFT
  // code17Lands: only needed if 17lands uses a different code
);
```

#### Constructor parameters:

| Parameter     | Type                         | Default                | Description                     |
| ------------- | ---------------------------- | ---------------------- | ------------------------------- |
| `code`        | `string`                     | required               | Lowercase set code              |
| `label`       | `string`                     | required               | Display name                    |
| `startDate`   | `string`                     | required               | Arena release date (YYYY-MM-DD) |
| `decks`       | `(Deck \| [Deck, string])[]` | `Deck.TWO_COLOR_DECKS` | Available deck archetypes       |
| `format`      | `Format`                     | `Format.PREMIER_DRAFT` | Draft format                    |
| `code17Lands` | `string`                     | `undefined`            | Override 17Lands set code       |

#### Special deck configurations:

For sets with non-standard archetypes (e.g., three-color sets like Khans of Tarkir), pass a custom deck array:

```tsx
static TARKIR_DRAGONSTORM = new MagicSet(
  "tdm",
  "Dragonstorm",
  "2025-04-08",
  [
    Deck.ABZAN, Deck.JESKAI, Deck.SULTAI,
    Deck.MARDU, Deck.TEMUR, Deck.ORZHOV,
    Deck.IZZET, Deck.GOLGARI, Deck.BOROS, Deck.SIMIC,
  ]
);
```

For guild sets (only 5 of the 10 two-color pairs), pass only the relevant decks:

```tsx
[Deck.AZORIUS, Deck.RAKDOS, Deck.GRUUL, Deck.ORZHOV, Deck.SIMIC];
```

For sets with a different draft format:

```tsx
static THROUGH_THE_OMENPATHS = new MagicSet(
  "om1",
  "Through the Omenpaths",
  "2025-09-22",
  Deck.TWO_COLOR_DECKS,
  Format.PICK_TWO_DRAFT  // non-default format
);
```

If 17Lands uses a different set code than the one in this app:

```tsx
static POWERED_CUBE = new MagicSet(
  "powered",
  "Powered Cube",
  "2025-10-28",
  Deck.TWO_COLOR_DECKS,
  Format.PREMIER_DRAFT,
  "cube - powered"       // code17Lands override
);
```

### Step 4: Add Icon Data in setIconPaths.ts

Edit `src/lib/setIconPaths.ts` to add the SVG icon data for the new set. Add the entry at the **top** of the `SET_ICON_PATHS` object (matching the order in `MagicSet.tsx`).

Use the `MagicSet` static field reference as the computed property key — **do not** hardcode the set code string. This avoids duplicating set codes across files.

```tsx
const SET_ICON_PATHS: Record<string, SetIconData> = {
  [MagicSet.NEW_SET_NAME.code]: {
    viewBox: "<viewBox from SVG>",    // e.g., "0 0 400 400"
    paths: [
      "<first path d attribute>",
      "<second path d attribute>",    // one string per <path> element
    ],
  },
  // ... existing entries
};
```

#### SVG data guidelines:

- Copy the `viewBox` exactly from the `<svg>` element
- Each `<path d="...">` becomes a string in the `paths` array
- Remove any `fill`, `stroke`, or style attributes — `GradientIcon` handles styling
- If the SVG has `fill="#000"` or similar single-color fills, just omit them
- Keep all path data intact; do not simplify or modify the `d` attributes

### Step 5: Populate the Scryfall Index Cache

After adding the `MagicSet` entry, populate the Scryfall index cache so the new set's card images are available. Run this via the admin CLI:

```bash
npm run admin -- populate-scryfall-index
```

Wait for it to complete. It fetches Scryfall bulk data and writes the index to both the file cache and Postgres cache. This ensures card image URLs are available for the new set.

### Step 6: Update next.config.js Redirect

Edit `next.config.js` to change the root redirect destination to the new set's code:

```javascript
redirects: async () => [
  {
    source: "/",
    destination: "/<newSetCode>",  // Update this to the new set code
    permanent: false,
  },
  // ... keep the other redirect unchanged
],
```

## File Locations Summary

| File                       | Change                                                    |
| -------------------------- | --------------------------------------------------------- |
| `src/lib/MagicSet.tsx`     | Add new static `MagicSet` instance (newest first)         |
| `src/lib/setIconPaths.ts`  | Add SVG icon data entry using `[MagicSet.NAME.code]` key  |
| `next.config.js`           | Update root `/` redirect to new set code                  |

## Admin CLI

The project has an admin CLI at `scripts/admin.ts` (run via `npm run admin`). Use it to populate caches when adding a new set. Run `npm run admin` with no args to see all available actions.

## Naming Convention for Static Field

Use UPPER_SNAKE_CASE for the static field name, derived from the set name:

- "Duskmourn" → `DUSKMOURN`
- "Modern Horizons 3" → `MODERN_HORIZONS_3`
- "Brothers' War" → `BROTHERS_WAR`
- "Wilds of Eldraine" → `WILDS_OF_ELDRAINE`
- "Lorwyn Eclipsed" → `LORWYN_ECLIPSED`

## Available Formats

- `Format.PREMIER_DRAFT` (default)
- `Format.TRADITIONAL_DRAFT`
- `Format.PICK_TWO_DRAFT`

## Available Deck Groups

- `Deck.TWO_COLOR_DECKS` — all 10 two-color pairs (default)
- `Deck.MONO_COLOR_DECKS` — 5 mono-color options
- Custom array of `Deck.*` statics for sets with unique archetypes
- Decks can have custom labels via tuple syntax: `[Deck.ORZHOV, "Custom Label"]`
