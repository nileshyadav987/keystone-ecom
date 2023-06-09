import { GraphQLSchema } from 'graphql';
import type { KeystoneConfig } from './types';
export declare function getSchemaPaths(cwd: string): {
    prisma: string;
    graphql: string;
};
declare type CommittedArtifacts = {
    graphql: string;
    prisma: string;
};
export declare function getFormattedGraphQLSchema(schema: string): string;
export declare function getCommittedArtifacts(graphQLSchema: GraphQLSchema, config: KeystoneConfig): Promise<CommittedArtifacts>;
export declare function validateCommittedArtifacts(graphQLSchema: GraphQLSchema, config: KeystoneConfig, cwd: string): Promise<void>;
export declare function writeCommittedArtifacts(artifacts: CommittedArtifacts, cwd: string): Promise<void>;
export declare function generateCommittedArtifacts(graphQLSchema: GraphQLSchema, config: KeystoneConfig, cwd: string): Promise<CommittedArtifacts>;
export declare function generateNodeModulesArtifactsWithoutPrismaClient(graphQLSchema: GraphQLSchema, config: KeystoneConfig, cwd: string): Promise<void>;
export declare function generateNodeModulesArtifacts(graphQLSchema: GraphQLSchema, config: KeystoneConfig, cwd: string): Promise<void>;
export declare type PrismaModule = {
    PrismaClient: {
        new (args: unknown): any;
    };
    Prisma: {
        DbNull: unknown;
        JsonNull: unknown;
        [key: string]: unknown;
    };
};
export declare function requirePrismaClient(cwd: string): PrismaModule;
export {};
