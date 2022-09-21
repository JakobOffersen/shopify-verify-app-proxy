# shopify-verify-app-proxy
Verify requests coming from your shopify theme extension (app-block / embedded app block) through a Shopify App Proxy.

NOTE: If you use `express`, you can use the [middleware](https://www.npmjs.com/package/shopify-verify-app-proxy-middleware) based on this package.

## Installation
```
npm install shopify-verify-app-proxy
```

## Details
Shopify App Proxies allow you to verify that a request comes from your theme extension (e.g. app-block or embedded app-block)-
The app proxy intercepts the request from the theme extension and extends the query with the following properties
```json
{
  "extra": ["1", "2"],
  "shop": "shop-name.myshopify.com",
  "logged_in_customer_id" : 1,
  "path_prefix": "/apps/your-prefix",
  "timestamp": "1317327555",
  "signature": "signature using your SHOPIFY_API_SECRET as shared secret",
}
```
This package helps you verify the signature of the query.

## Example
``` ts
const { SHOPIFY_API_SECRET } = process.env
const query = {
  "extra": ["1", "2"],
  "shop": "shop-name.myshopify.com",
  "logged_in_customer_id" : 1,
  "path_prefix": "/apps/your-prefix",
  "timestamp": "1317327555",
  "signature": "signature using your SHOPIFY_API_SECRET as shared secret",
}

const { signature ...rest } = query
const data = transformRecordToSortedKeyValueString(rest)
const verified = verifyAppProxySignature(signature, SHOPIFY_API_SECRET, data) // true iff the signature is valid => the request comes from your theme extension
```