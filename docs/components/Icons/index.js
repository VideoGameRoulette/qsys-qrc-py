import { classNames } from "utils";

export const MenuIcon = ({ className: externalClassNames }) => {
    return (
        <svg className={classNames(externalClassNames, "hamburger")} viewBox="0 0 100 100" fill="currentColor">
            <rect className="line top" width="80" height="10" x="10" y="25" rx="5" />
            <rect className="line middle" width="80" height="10" x="10" y="45" rx="5" />
            <rect className="line bottom" width="80" height="10" x="10" y="65" rx="5" />
        </svg>
    )
}