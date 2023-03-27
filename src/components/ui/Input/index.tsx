import { isUndefined } from "util";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    title: string
}

export function Input({title, className, ...props}: InputProps) {
    
    className = className != undefined ? className : '';

    return (
        <fieldset className={"flex flex-col mx-2 " + className}>
            <label htmlFor={props.id}>{title}</label>
            <input className={"border-gray-500 border-b-2 focus:border-blue-900 focus:outline-none"} {...props}/>
        </fieldset>
    );
}
