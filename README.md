<div align="center">
    <h1>bcra.js</h1>
    Very basic JavaScript / TypeScript API wrapper for the Banco Central de la República Argentina API.
</div>

>[!CAUTION]
> This project is not stable by any means. It was designed to be used in another very specific project, so if you're gonna use this, you're warned.

# Install
```bash
# npm
npm install bcra.js
```

# Example

```typescript
import {BcraClient} from "./bcraClient";

const client = new BcraClient();
const principalesVariables = client.getPrincipalesVariablesAsync();

console.log(principalesVariables);
```