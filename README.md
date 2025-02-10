# turnstile

Typed wrapper for Cloudflare's [captcha alternative](https://developers.cloudflare.com/turnstile/).

## usage

``` typescript
import { createTurnstile } from "turnstile";

const turnstile = createTurnstile({
    secret: "my-secret"
});

// later

const { success } = turnstile.verify({
    response, // token from user
    userip, // client's ip address
});

if(success !== true) {
    // bad request!
}
```