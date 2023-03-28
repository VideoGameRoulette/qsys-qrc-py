import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const functionList = [
    {
        name: "send_command",
        snippet: "async def send_command(\n\tsock: socket.socket,\n\tmethod: str,\n\tparams: Iterable[str]\n)",
        description: "Sends a JSON-RPC command to a Q-SYS Core device.",
        params: [
            {
                name: "sock",
                desc: "The socket object used for communication with the Q-SYS Core device."
            },
            {
                name: "method",
                desc: "The name of the method to call in the JSON-RPC command."
            },
            {
                name: "params",
                desc: "The parameters to pass to the method."
            }
        ],
    },
    {
        name: "logon",
        snippet: "async def logon(\n\tsock: socket.socket,\n\tuser: str,\n\tpin: str\n)",
        description: "Logs in to a Q-SYS Core device.",
        params: [
            {
                name: "sock",
                desc: "The socket object used for communication with the Q-SYS Core device."
            }
        ],
    },
    {
        name: "no_op",
        snippet: "async def no_op(\n\tsock: socket.socket\n)",
        description: "Sends a JSON-RPC request with no operation to the Q-SYS Core device.",
        params: [
            {
                name: "sock",
                desc: "The socket object used for communication with the Q-SYS Core device."
            }
        ],
    },
    {
        name: "get_status",
        snippet: "async def get_status(\n\tsock: socket.socket\n)",
        description: "Sends a JSON-RPC request to get the status of the Q-SYS Core device.",
        params: [
            {
                name: "sock",
                desc: "The socket object used for communication with the Q-SYS Core device."
            }
        ],
    },
    {
        name: "get_control",
        snippet: "async def get_control(\n\tsock: socket.socket,\n\tname: List[str]\n)",
        description: "Sends a JSON-RPC request to get the value of a control in the Q-SYS Core device.",
        params: [
            {
                name: "sock",
                desc: "The socket object used for communication with the Q-SYS Core device."
            },
            {
                name: "name",
                desc: "The name of the control to get the value of."
            }
        ],
    },
    {
        name: "set_control",
        snippet: "async def set_control(\n\tsock: socket.socket,\n\tname: str,\n\tvalue: int,\n\tramp: Optional[float] = None\n)",
        description: "Sends a JSON-RPC request to set the value of a control in the Q-SYS Core device.",
        params: [
            {
                name: "sock",
                desc: "The socket object used for communication with the Q-SYS Core device."
            },
            {
                name: "name",
                desc: "The name of the control to get the value of."
            },
            {
                name: "value",
                desc: "The value to set the control to."
            },
            {
                name: "ramp",
                desc: "The time in seconds it takes to ramp the control to the new value."
            },
        ],
    },
    {
        name: "get_component",
        snippet: "async def get_component(\n\tsock: socket.socket,\n\tname: str,\n\tcontrol_name: str\n)",
        description: "Sends a JSON-RPC request to get the value of a control for a specific component in the Q-SYS Core device.",
        params: [
            {
                name: "sock",
                desc: "The socket object used for communication with the Q-SYS Core device."
            },
            {
                name: "name",
                desc: "The name of the control to get the value of."
            },
            {
                name: "control_name",
                desc: "The name of the control to get the value of."
            }
        ],
    },
    {
        name: "set_component",
        snippet: "async def set_component(\n\tsock: socket.socket,\n\tname: str,\n\tvalue: int\n)",
        description: "Sends a JSON-RPC request to set the value of a control for a specific component in the Q-SYS Core device.",
        params: [
            {
                name: "sock",
                desc: "The socket object used for communication with the Q-SYS Core device."
            },
            {
                name: "name",
                desc: "The name of the control to get the value of."
            },
            {
                name: "value",
                desc: "The value to set the control to."
            }
        ],
    },
    {
        name: "get_component_controls",
        snippet: "async def get_component_controls(\n\tsock: socket.socket,\n\tname: str\n)",
        description: "Sends a JSON-RPC request to get all controls of a component in the Q-SYS Core device.",
        params: [
            {
                name: "sock",
                desc: "The socket object used for communication with the Q-SYS Core device."
            },
            {
                name: "name",
                desc: "The name of the control to get the value of."
            }
        ],
    },
    {
        name: "get_component_components",
        snippet: "async def get_component_components(\n\tsock: socket.socket\n)",
        description: "Sends a JSON-RPC request to get all child components of a component in the Q-SYS Core device.",
        params: [
            {
                name: "sock",
                desc: "The socket object used for communication with the Q-SYS Core device."
            },
            {
                name: "name",
                desc: "The name of the control to get the value of."
            }
        ],
    },
];

const CodeBlock = ({ funcName, snippet, description, params = [] }) => {
    return (
        <>
            <h3 className="text-lg font-bold my-4" id={funcName}>{funcName}</h3>
            <div className="bg-[#1e1e1e] rounded-md overflow-hidden">
                <SyntaxHighlighter language="python" style={vscDarkPlus}>
                    {snippet}
                </SyntaxHighlighter>
            </div>
            <div className="bg-slate-900 p-4 mt-4 rounded-md text-xs">
                <p className=" text-sm">{description}</p>
                <ul className="list-disc mt-2 ml-6">
                    {params.map(({ name, desc }) => (
                        <li key={name}><code>{name}</code>: {desc}</li>
                    ))}
                </ul>
            </div>
        </>

    );
}

export default CodeBlock;