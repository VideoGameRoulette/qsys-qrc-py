import socket
import json
from typing import Iterable, Optional, List
from collections.abc import Callable
import asyncio
BUFFER_SIZE = 1024


async def send_command(
    sock: socket.socket,
    method: str,
    params: Iterable[str]
):
    """
    Official Q-Sys Remote Control Command Documentation

    https://q-syshelp.qsc.com/Content/External_Control_APIs/QRC/QRC_Commands.htm
    """
    sock.send(
        json.dumps({
            "jsonrpc": "2.0",
            "method": method,
            "params": params,
        }).encode(),
    )


async def logon(sock: socket.socket, user: str, pin: str):
    try:
        await send_command(
            sock,
            "Logon",
            {
                "User": user,
                "Password": pin
            })
        return True
    except Exception as e:
        print(f"An error occurred during logon: {e}")
        return e


async def no_op(sock: socket.socket):
    """
    Sends a JSON-RPC request with no operation to the qsys remote control.

    :param sock: The socket object to use for communication.

    """
    await send_command(sock, "NoOp", {})


async def get_status(sock: socket.socket):
    """
    Sends a JSON-RPC request to get the status of the qsys remote control.

    :param sock: The socket object to use for communication.

    Expected Response:
    {
        "Platform": str,
        "State": str,
        "DesignName": str,
        "DesignCode": str,
        "IsRedundant": bool,
        "IsEmulator": bool,
        "Status":{
          "Code": int
          "String": str
        }
    }
    """
    await send_command(sock, "StatusGet", {})


async def get_control(sock: socket.socket, name: List[str]):
    """
    Sends a JSON-RPC request to get the value of a given control from the
    qsys remote control.

    :param sock: The socket object to use for communication.
    :param name: The name of the control to get the value of.

    Expected Response:
    {
        "Name": str,
        "Value": any
    }
    """
    await send_command(sock, "Control.Get", name)


async def set_control(
    sock: socket.socket,
    name: str,
    value: int,
    ramp: Optional[float] = None
):
    """
    Sends a JSON-RPC request to set the value of a given control in the
    qsys remote control.

    :param sock: The socket object to use for communication.
    :param name: The name of the control to set the value of, relative to
    the component.
    :param value: The value to set the control to. This can be a number,
    string, or boolean.
    :param ramp: (Optional) The ramp time used to set the control.
    """
    await send_command(
        sock,
        "Control.Set",
        {
            "Name": name,
            "Value": value,
            "Ramp": ramp
        }
    )


async def get_component(sock: socket.socket, name: str, control_name: str):
    """
    Sends a JSON-RPC request to get the value of a given control for a
    specified component in the qsys remote control.

    :param sock: The socket object to use for communication.
    :param name: The name of the component to get the control value for.
    :param control_name: The name of the control to get the value of,
    relative to the component.

    Expected Response:
    {
        "Name": str,
        "Controls": [
            {
                "Name": str,
                "Value": float,
                "String": str,
                "Position": int
            }
        ]
    }
    """
    await send_command(
        sock,
        "Component.Get",
        {
            "Name": name,
            "Controls": [
                {
                    "Name": control_name
                }
            ]
        }
    )


async def set_component(sock: socket.socket, name: str, value: int):
    """
    Sends a JSON-RPC request to set the value of a given control for a
    specified component in the qsys remote control.

    :param sock: The socket object to use for communication.
    :param name: The name of the control to set the value of, relative
    to the component.
    :param value: The value to set the control to. This can be a number,
    string, or boolean.
    """
    await send_command(
        sock,
        "Component.Set",
        {
            "Name": name,
            "Value": value
        }
    )


async def get_component_controls(sock: socket.socket, name: str):
    """
    Sends a JSON-RPC request to get all controls of a component from the
    qsys remote control.

    :param sock: The socket object to use for communication.
    :param name: The name of the component to get controls from.

    Expected Response:
    {
        "Name": str,
        "Controls": [
            {
                "Name": str,
                "Type": str,
                "Value": any,
                "ValueMin": float,
                "ValueMax": float,
                "StringMin": str,
                "StringMax": str,
                "String": str,
                "Position": float,
                "Direction": str
            }
        ]
    }
    """
    await send_command(
        sock,
        "Component.GetControls",
        {
            "Name": name
        }
    )


async def get_component_components(sock: socket.socket):
    """
    Sends a JSON-RPC request to get a list of components and their properties
    from the qsys remote control.

    :param sock: The socket object to use for communication.

    Expected Response:
        [
            {
                "Name": str,
                "Type": str,
                "Properties": [
                    {
                        "Name": str,
                        "Value": any
                    }
                ]
            }
        ]
    """
    await send_command(sock, "Component.GetComponents", {})


async def prevent_timeout(sock: socket.socket):
    """
    Prevents the qsys remote control from timing out by sending a NoOp
    request every 30 seconds.

    :param sock: The socket object to use for communication.
    """
    while True:
        await no_op(sock)
        await asyncio.sleep(30)


async def listen_to_server(
    sock: socket.socket,
    callback: Callable[[bytes], object]
):
    """
    Listens to the qsys remote control server by receiving data from the
    socket and calling the given callback function.

    :param sock: The socket object to use for communication.
    :param callback: The callback function to call when data is received.
    """
    while True:
        callback(sock.recv(BUFFER_SIZE).decode())


def socket_message_received(encoded_message: bytes):
    """
    Acts as websocket orchestrator / primary controller, redirect commands
    to the appropriate controllers/services.
    Filter out NoOps.
    """
    print("Server message:", encoded_message)


def connect_to_qrc(address: str, port: str):
    """
    Connects to the QRC Socket using ip address and port.

    :param address: The ip address of the Qsys machine.
    :param port: The port address of the Qsys machine.
    """
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect((address, port))
    asyncio.create_task(listen_to_server(sock, socket_message_received))
    return sock
