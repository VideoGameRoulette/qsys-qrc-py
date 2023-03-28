export const MainContainer = ({ children }) => {
    return (
        <div className="w-full h-full grid grid-rows-[4rem_auto]">
            {children}
        </div>
    )
}

export const SecondaryContainer = ({ children }) => {
    return (
        <div className="xl:grid xl:grid-cols-[20%_80%] w-full h-full overflow-hidden">
            {children}
        </div>
    )
}