type MessagePayload = {
    type: string,
    data?: unknown
};

type ResponsePayload = {
    data?: unknown,
    error?: {
        message: string,
        stack: string
    }
};

type InternalMessageSender<MsgCtx> = (msg: MessagePayload, context: MsgCtx) => Promise<ResponsePayload>;

type InternalMessageHandler<ListenerCtx> = (
    msg: MessagePayload,
    sendResponse: (response: ResponsePayload) => void,
    context: ListenerCtx,
) => boolean;

export type MessageSender<MsgCtx> = (type: string, data: unknown, context: MsgCtx) => Promise<any>;

export type AddListener<Ctx> = (type: string, callback: ListenerCallback<Ctx>) => void;

type ListenerCallback<Ctx> = (data: any, context: Ctx) => Promise<unknown> | unknown;

class MessageHandlerError extends Error {
	constructor(message: string, stack: string) {
		super();
		this.message = message;
		this.stack = stack;
	}
}

export function createMessageHandler<MsgCtx, ListenerCtx>(
    _sendMessage: InternalMessageSender<MsgCtx>,
    errorOnUnrecognizedTypes: boolean = false,
): {
    _handleMessage: InternalMessageHandler<ListenerCtx>,
    sendMessage: MessageSender<MsgCtx>,
    addListener: AddListener<ListenerCtx>
} {
	const listeners = new Map();

	function addListener(type: string, callback: ListenerCallback<ListenerCtx>) {
		if (listeners.has(type)) {
			throw new Error(`Listener for "${type}" already exists.`);
		}
		listeners.set(type, callback);
	}

	async function sendMessage(type: string, data: unknown, context: MsgCtx) {
		const { data: newData, error } = await _sendMessage({ type, data }, context);
		if (error) {
			throw new MessageHandlerError(error.message, `${error.stack}\n    at target's "${type}" handler`);
		} else {
			return newData;
		}
	}

	function _handleMessage({ type, data }, sendResponse: (response: ResponsePayload) => void, context: ListenerCtx) {
		const listener = listeners.get(type);
		if (!listener) {
			if (errorOnUnrecognizedTypes) {
				sendResponse({ error: { message: `Unrecognised message type: ${type}`, stack: '' } });
			}
			return false;
		}

		let response;

		try {
			response = listener(data, context);
		} catch (e: any) {
			console.error(e);
			sendResponse({ error: { message: e.message, stack: e.stack } });
			return false;
		}

		if (response instanceof Promise) {
			response
				.then(
					data => sendResponse({ data }),
					e => {
						console.error(e);
						sendResponse({ error: { message: e.message, stack: e.stack } });
					},
				);
			// true = response will be handled asynchronously (needed for Chrome)
			return true;
		} else {
			sendResponse({ data: response });
			return false;
		}
	}

	return {
		_handleMessage,
		sendMessage,
		addListener,
	};
}
