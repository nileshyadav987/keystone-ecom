export declare function getConfigPath(cwd: string): string;
export declare function getAdminPath(cwd: string): string;
export declare function getBuiltConfigPath(cwd: string): string;
export declare class ExitError extends Error {
    code: number;
    constructor(code: number);
}
