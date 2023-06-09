import { KeystoneContext } from '../../types';
import { InitialisedList } from './types-for-lists';
export declare type InputFilter = Record<string, any> & {
    _____?: 'input filter';
    AND?: InputFilter[];
    OR?: InputFilter[];
    NOT?: InputFilter[];
};
export declare type PrismaFilter = Record<string, any> & {
    _____?: 'prisma filter';
    AND?: PrismaFilter[] | PrismaFilter;
    OR?: PrismaFilter[] | PrismaFilter;
    NOT?: PrismaFilter[] | PrismaFilter;
    length?: undefined;
    then?: undefined;
};
export declare type UniqueInputFilter = Record<string, any> & {
    _____?: 'unique input filter';
};
export declare type UniquePrismaFilter = Record<string, any> & {
    _____?: 'unique prisma filter';
    then?: undefined;
};
export declare function resolveUniqueWhereInput(input: UniqueInputFilter, list: InitialisedList, context: KeystoneContext): Promise<UniquePrismaFilter>;
export declare function resolveWhereInput(inputFilter: InputFilter, list: InitialisedList, context: KeystoneContext, isAtRootWhere?: boolean): Promise<PrismaFilter>;
