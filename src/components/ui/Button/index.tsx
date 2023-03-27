interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
}

export function Button({ title, ...props }: ButtonProps) {
    
    props.className = props.className != undefined ? props.className : '';
    
    return !props.disabled ?
        <button {...props}
            className={"m-1 text-white p-2 font-medium border-2 border-blue-600 bg-blue-600 rounded-lg hover:border-blue-700 hover:bg-blue-700 " + props.className} >
            {title}</button>
        : <button {...props}
            className={"m-1 text-gray-800 p-2 font-medium border-2 bg-gray-600 border-gray-600 rounded-l " + props.className}>
            {title}</button>
}