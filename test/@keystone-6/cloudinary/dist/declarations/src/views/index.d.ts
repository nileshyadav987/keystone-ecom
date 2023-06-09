/** @jsxRuntime classic */
/** @jsx jsx */
import { CardValueComponent, CellComponent, FieldController, FieldControllerConfig } from '@keystone-6/core/types';
export { Field } from './Field';
export declare const Cell: CellComponent;
export declare const CardValue: CardValueComponent;
declare type ImageData = {
    id: string;
    filename: string;
    publicUrlTransformed: string;
};
declare type CloudinaryImageValue = {
    kind: 'empty';
} | {
    kind: 'from-server';
    data: ImageData;
} | {
    kind: 'upload';
    data: {
        file: File;
        validity: ValidityState;
    };
    previous: CloudinaryImageValue;
} | {
    kind: 'remove';
    previous: Exclude<CloudinaryImageValue, {
        kind: 'remove';
    }>;
};
declare type CloudinaryImageController = FieldController<CloudinaryImageValue>;
export declare const controller: (config: FieldControllerConfig) => CloudinaryImageController;
