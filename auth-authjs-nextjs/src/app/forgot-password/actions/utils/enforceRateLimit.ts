
const MAX_ATTEMPTS = 5;
const SHORT_COOLDOWN_MS = 5 * 1000;
const LONG_RESET_MS = 4 * 60 * 60 * 1000;

type EnforceRateLimitParams = {
	attempts: number;
	lastSentAt: Date;
} | null;

type EnforceRateLimitResult =
	| {
		success: true;
		attempts: number
	}
	| {
		success: false,
		type: 'MAX_ATTEMPTS' | 'COOLDOWN'
	}

export async function enforceRateLimit(params: EnforceRateLimitParams): Promise<EnforceRateLimitResult> {
	if (!params) {
		return {
			success: true,
			attempts: 0,
		};
	}

	const attempts = params.attempts;
	const lastSentAt = params.lastSentAt;
	const now = Date.now();

	const sinceLastSendMs = Math.abs(now - lastSentAt.getTime());

	const attemptsAfterReset = sinceLastSendMs >= LONG_RESET_MS
		? 0
		: attempts;

	if (attemptsAfterReset >= MAX_ATTEMPTS) {
		return {
			success: false,
			type: 'MAX_ATTEMPTS',
		};
	}

	if (sinceLastSendMs < SHORT_COOLDOWN_MS) {
		return {
			success: false,
			type: 'COOLDOWN',
		};
	}

	return {
		success: true,
		attempts: attemptsAfterReset,
	};
}
