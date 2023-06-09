declare function confirmPromptImpl(message: string, initial?: boolean): Promise<boolean>;
declare function textPromptImpl(message: string): Promise<string>;
export declare let shouldPrompt: boolean;
export declare let confirmPrompt: typeof confirmPromptImpl;
export declare let textPrompt: typeof textPromptImpl;
export declare function mockPrompts(prompts: {
    text: (message: string) => Promise<string>;
    confirm: (message: string) => Promise<boolean>;
    shouldPrompt: boolean;
}): void;
export declare function resetPrompts(): void;
export {};
