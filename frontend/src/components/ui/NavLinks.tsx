import { Link } from "react-router-dom";


export const NavLinks = ({link, to} : {link: string, to: string}) => {
    return (
        <ul className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 capitalize font-body">
            <li><Link to={to} className="hover:text-midnight-navy hover:font-semibold transition-colors">{link}</Link></li>
        </ul>
    )
}