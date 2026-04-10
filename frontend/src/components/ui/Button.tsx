

export default function Button (props:any) {
    return (
        <button onClick={props.onClick} className = "bg-delight-blue text-white px-4 py-2 rounded-full hover:bg-deep-delight transition-colors font-body">
            {props.text}
        </button>
    );
};

