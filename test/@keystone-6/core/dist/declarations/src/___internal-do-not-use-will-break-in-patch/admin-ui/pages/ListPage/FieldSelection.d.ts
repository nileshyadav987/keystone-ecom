import { jsx } from '@keystone-ui/core';
import { ListMeta } from '../../../../types';
export declare const fieldSelectionOptionsComponents: {
    Option: <OptionType, IsMulti extends boolean>({ children, isDisabled, isFocused, innerProps, innerRef, className, }: import("react-select").OptionProps<OptionType, IsMulti, import("react-select").GroupBase<OptionType>>) => jsx.JSX.Element;
};
export declare function FieldSelection({ list, fieldModesByFieldPath, }: {
    list: ListMeta;
    fieldModesByFieldPath: Record<string, 'hidden' | 'read'>;
}): jsx.JSX.Element;
