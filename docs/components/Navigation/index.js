import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const main = [
    "Getting-Started",
    "Prerequisites",
    "Installation",
    "Usage"
];

const sub = [
    "send_command",
    "logon",
    "no_op",
    "get_status",
    "get_control",
    "set_control",
    "get_component",
    "set_component",
    "get_component_controls",
    "get_component_components"
];

export const SideBar = () => {
    return (
        <nav className="hidden xl:block bg-gray-900 text-white w-full h-full overflow-y-auto">
            <h2 className="px-4 py-3 text-lg font-bold">Table of Contents</h2>
            <div>
                {main.map(str => (
                    <a key={str} href={`#${str}`} className="block py-2 hover:bg-gray-700 pl-4">{str.replace('-', ' ')}</a>
                ))}
            </div>
            <h2 className="px-4 py-3 text-lg font-bold">Functions</h2>
            <div>
                {sub.map(str => (
                    <a key={str} href={`#${str}`} className="block py-2 hover:bg-gray-700 pl-4">{str}</a>
                ))}
            </div>
        </nav>
    )
}

export const PopupBar = ({ open, setOpen }) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={setOpen} />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-auto">
                    <div className="flex min-h-full items-start justify-center sm:p-4 text-center sm:items-center p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform bg-gray-700 text-left transition-all sm:m-8 m-0 w-full h-screen overflow-auto p-4" >
                                <div className="w-full shrink bg-gray-700 p-4 text-sm font-semibold leading-6 text-gray-200 ring-1 ring-gray-900/5 overflow-auto">
                                    <h2 className="text-lg font-bold mb-4">Table of Contents</h2>
                                    <div className="text-center mb-4">
                                        {main.map(str => (
                                            <a key={str} href={`#${str}`} className="block py-4 odd:bg-gray-600 even:bg-gray-500" onClick={setOpen}>
                                                {str.replace('-', ' ')}
                                            </a>
                                        ))}
                                    </div>
                                    <h2 className="text-lg font-bold mb-4">Functions</h2>
                                    <div className="text-center">
                                        {sub.map(str => (
                                            <a key={str} href={`#${str}`} className="block py-4 odd:bg-gray-600 even:bg-gray-500" onClick={setOpen}>
                                                {str}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}