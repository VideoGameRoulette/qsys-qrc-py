import asyncio
from qsys_qrc_py import connect_to_qrc, prevent_timeout
import os

address = os.environ.get('IP') or "localhost"
port = os.environ.get('PORT') or 1710
user = os.environ.get('USER') or "dev"
pin = os.environ.get('PIN') or "1234"


async def main():
    # Connect to QRC
    sock = connect_to_qrc(address, port)
    # noop loop to maintain connection
    asyncio.create_task(prevent_timeout(sock))


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
    asyncio.get_event_loop().run_forever()