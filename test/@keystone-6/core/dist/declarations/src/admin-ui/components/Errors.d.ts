/** @jsxRuntime classic */
/** @jsx jsx */
import { Component, ReactNode } from 'react';
import { jsx } from '@keystone-ui/core';
declare type ErrorBoundaryProps = {
    children: ReactNode;
};
declare type ErrorBoundaryState = {
    error?: any;
    hasError: boolean;
    isReloading: boolean;
};
export declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState;
    static getDerivedStateFromError(error: any): {
        error: any;
        hasError: boolean;
    };
    reloadPage: () => void;
    render(): string | number | boolean | import("react").ReactFragment | jsx.JSX.Element | null | undefined;
}
declare type ErrorContainerProps = {
    children: ReactNode;
};
export declare const ErrorContainer: ({ children }: ErrorContainerProps) => jsx.JSX.Element;
export {};
