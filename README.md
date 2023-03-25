# Q-SYS Remote Control API

This is a Python module for interfacing with the Q-SYS remote control API over a TCP/IP socket connection. The API provides a way to get and set values of controls in the Q-SYS Designer environment.

## Table of Contents

- [Getting started](#Getting-started)
- [Prerequisites](#Prerequisites)
- [Installation](#Installation)
- [Usage](#Usage)

### Functions
- [send_command](#send_command)
- [logon](#logon)
- [no_op](#no_op)
- [get_status](#get_status)
- [get_control](#get_control)
- [set_control](#set_control)
- [get_component](#get_component)
- [set_component](#set_component)
- [get_component_controls](#get_component_controls)
- [get_component_components](#get_component_components)

## Getting started

### Prerequisites

- Python 3.7 or higher
- Q-SYS Core Designer

### Installation

You can install this module using pip:

```
under construction
```


### Usage

To use this module, you will need to have a Q-SYS Core Designer project open and running on your network.

## send_command

```py
async def send_command(sock: socket.socket, method: str, params: Iterable[str])
```

Sends a JSON-RPC command to a Q-SYS Core device.

* sock: The socket object used for communication with the Q-SYS Core device.
* method: The name of the method to call in the JSON-RPC command.
* params: The parameters to pass to the method.

## logon

```py
async def logon(sock: socket.socket)
```

Logs in to a Q-SYS Core device.

* sock: The socket object used for communication with the Q-SYS Core device.

## no_op

```py
async def no_op(sock: socket.socket)
```

Sends a JSON-RPC request with no operation to the Q-SYS Core device.

* sock: The socket object used for communication with the Q-SYS Core device.

## get_status

```py
async def get_status(sock: socket.socket)
```

Sends a JSON-RPC request to get the status of the Q-SYS Core device.

* sock: The socket object used for communication with the Q-SYS Core device.

## get_control

```py
async def get_control(sock: socket.socket, name: str)
```

Sends a JSON-RPC request to get the value of a control in the Q-SYS Core device.

* sock: The socket object used for communication with the Q-SYS Core device.
* name: The name of the control to get the value of.

## set_control

```py
async def set_control(sock: socket.socket, name: str, value: int, ramp: Optional[float] = None)
```

Sends a JSON-RPC request to set the value of a control in the Q-SYS Core device.

* sock: The socket object used for communication with the Q-SYS Core device.
* name: The name of the control to set the value of.
* value: The value to set the control to.
* ramp (optional): The time in seconds it takes to ramp the control to the new value.

## get_component

```py
async def get_component(sock: socket.socket, name: str, control_name: str)
```

Sends a JSON-RPC request to get the value of a control for a specific component in the Q-SYS Core device.

* sock: The socket object used for communication with the Q-SYS Core device.
* name: The name of the component to get the control value for.
* control_name: The name of the control to get the value of.

## set_component

```py
async def set_component(sock: socket.socket, name: str, value: int)
```

Sends a JSON-RPC request to set the value of a control for a specific component in the Q-SYS Core device.

* sock: The socket object used for communication with the Q-SYS Core device.
* name: The name of the component to set the control value for.
* value: The value to set the control to.

## get_component_controls

```py
async def get_component_controls(sock: socket.socket, name: str)
```

Sends a JSON-RPC request to get all controls of a component in the Q-SYS Core device.

* sock: The socket object used for communication with the Q-SYS Core device.
* name: The name of the component to get the controls from.

## get_component_components

```py
async def get_component_components(sock: socket.socket, name: str)
```

Sends a JSON-RPC request to get all child components of a component in the Q-SYS Core device.

* sock: The socket object used for communication with the Q-SYS Core device.
* name: The name of the component to get the child components from.
