import { InputHTMLAttributes } from 'react';

export default function Input({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`rounded border-gray-700 bg-gray-900 ${className}`}
        />
    );
}
