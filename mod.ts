/**
 * Represents a verification error. verify() can return one or more of these.
 */
export type TurnstileVerifyError =
	| "missing-input-secret"
	| "invalid-input-secret"
	| "missing-input-response"
	| "invalid-input-response"
	| "bad-request"
	| "timeout-or-duplicate"
	| "internal-error";

/**
 * Union type of successful and failed verification responses. Use response.success to check which.
 */
export type TurnstileVerifyResponse = {
	success: false;
	"error-codes": TurnstileVerifyError[];
} | {
	success: true;
	challenge_ts: string;
	hostname: string;
	action?: string;
	cdata?: unknown;
};

/**
 * Turnstile instantiation object. Keeps track of your secret.
 */
export type Turnstile = {
	verify: (params: {
		response: string;
		remoteip?: string;
		idempotency_key?: string;
	}) => Promise<TurnstileVerifyResponse>;
};

/**
 * Create a new Turnstile instance!
 */
export const createTurnstile = ({ secret }: { secret: string }): Turnstile => ({
	verify: async (params) => {
		const response = await fetch(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
			{
				method: "POST",
				body: JSON.stringify({
					secret,
					...params,
				}),
			},
		);

		return await response.json() as TurnstileVerifyResponse;
	},
});
