/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';
export declare function CreateItemDrawer({ listKey, onClose, onCreate, }: {
    listKey: string;
    onClose: () => void;
    onCreate: (item: {
        id: string;
        label: string;
    }) => void;
}): jsx.JSX.Element;
