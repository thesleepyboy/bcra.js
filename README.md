<div align='center'>
    <h1>bcra.js</h1>
    <span>Basic TypeScript / JavaScript API wrapper for the Banco Central de la República Argentina (BCRA) API</span>
</div>

> [!IMPORTANT]
> This project is still on its beta release. There will be full support for all BCRA's 4 APIs as of v1.0 

## Auth

This API does not require authentication.

## Installation

```bash
npm install bcra.js
# or
yarn add bcra.js
```

## Example

```typescript
import { BcraClient } from "bcra.js";

const client = new BcraClient();

const principalesVariables = await client.monetarias.getPrincipalesVariablesAsync();
console.log(principalesVariables.reservas_internacionales.ultValorInformado); // Output: 41901.0
```

## Supported endpoints
As of v0.9.0
|Endpoint|Status|
|--------|-------|
|estadisticas/v4.0/Monetarias|✅Supported|
|estadisticas/v4.0/Metodologia|✅Supported|
|estadisticascambiarias/v1.0/Maestros/Divisas|❌Unsupported|
|estadisticascambiarias/v1.0/Cotizaciones|❌Unsupported|
|cheques/v1.0/Entidades|❌Unsupported|
|cheques/v1.0/Denunciados|❌Unsupported|
|centraldeudores/v1.0/Deudas|❌Unsupported|
|centraldeudores/v1.0/Deudas/Historicas|❌Unsupported|
|centraldeudores/v1.0/Deudas/ChequesRechazados|❌Unsupported|