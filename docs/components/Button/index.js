import { useState } from "react";
import { classNames } from "utils";
import { PopupBar } from 'components/Navigation';

export const MenuButton = ({ className: externalClassNames = "", name, children, callback = () => null }) => {
    const [isOpen, setOpen] = useState(false);
    const [state, setState] = useState("closed");
    const [expanded, setExpanded] = useState("false");

    const changeState = () => {
        if (!isOpen) {
            setState("opened");
            return;
        }
        setState("closed");
    }

    const changeExpanded = () => {
        if (!isOpen) {
            setExpanded("true");
            return;
        }
        setExpanded("false");
    }

    const cb = () => {
        changeState();
        changeExpanded();
        setOpen(prev => !prev);
    }

    return (
        <>
            <PopupBar open={isOpen} setOpen={cb} />
            <button
                className={classNames(externalClassNames, "menu-one bg-slate-700 hover:bg-slate-500 focus:bg-slate-500 border-2 m-2 rounded-md")}
                aria-expanded={expanded}
                data-state={state}
                id={name}
                onClick={() => cb()}
            >
                {children}
            </button>
        </>
    );
}

const getColor = (color) => {
    switch (color) {
        default:
            return "bg-slate-700 hover:bg-slate-500 focus:bg-slate-500";
        case "red":
            return "bg-red-700 hover:bg-red-500 focus:bg-red-500";
        case "green":
            return "bg-green-700 hover:bg-green-500 focus:bg-green-500";
        case "indigo":
            return "bg-indigo-700 hover:bg-indigo-500 focus:bg-indigo-500";
        case "sky":
            return "bg-sky-700 hover:bg-sky-500 focus:bg-sky-500";
    }
}

export const Button = ({ className: externalClassNames = "", color = "default", children, callback = () => null }) => {
    const c = getColor(color);
    return (
        <button
            className={classNames(externalClassNames, c, "p-2 px-4 border-2 m-2 rounded-md")}
            onClick={() => callback()}
        >
            {children}
        </button>
    );
}