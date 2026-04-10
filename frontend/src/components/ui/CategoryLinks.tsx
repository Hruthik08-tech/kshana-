

export const CategoryLinks = ({link} : {link: string}) => {
    return (
        <li>
            <a href="#" className="whitespace-nowrap px-4 py-2 rounded-full bg-white text-midnight-navy/70 font-semibold tracking-wide text-xs uppercase block">
                {link}
            </a>
        </li>
    )
}