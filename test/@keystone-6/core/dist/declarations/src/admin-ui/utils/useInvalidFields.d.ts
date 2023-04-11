import { FieldMeta } from '../../types';
import { Value } from './item-form';
export declare function useInvalidFields(fields: Record<string, FieldMeta>, value: Value): ReadonlySet<string>;
