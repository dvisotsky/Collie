# Shared Types

This package contains TypeScript interfaces shared between the Express API and Vue frontend.

## Installation

To use this package in your Express API or Vue frontend project:

1. Install the package locally:

   ```bash
   # From the express-api directory
   npm install ../shared-types

   # From the vue-frontend directory
   npm install ../shared-types
   ```

2. Import the interfaces in your code:
   ```typescript
   import { User, Group, AuthResponse } from "shared-types";
   ```

## Development

To build the package:

```bash
npm run build
```

## Publishing

If you want to publish this package to a private npm registry:

1. Update the package.json with your registry information
2. Run `npm publish`
