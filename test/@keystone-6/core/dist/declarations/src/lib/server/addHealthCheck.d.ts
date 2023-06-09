import { Application } from 'express';
import type { KeystoneConfig } from '../../types';
declare type AddHealthCheckArgs = {
    config: KeystoneConfig;
    server: Application;
};
export declare const addHealthCheck: ({ config, server }: AddHealthCheckArgs) => Promise<void>;
export {};
