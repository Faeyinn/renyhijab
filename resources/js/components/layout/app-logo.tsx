export default function AppLogo({ iconOnly = false }: { iconOnly?: boolean }) {
    if (iconOnly) {
        return (
            <img
                src="/logo-rh.png"
                alt="Renyhijab Logo"
                className="size-6 object-contain brightness-0 invert"
            />
        );
    }

    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-transparent">
                <img
                    src="/logo-rh.png"
                    alt="Renyhijab Logo"
                    className="size-8 object-contain"
                />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-red-950">
                    Renyhijab
                </span>
            </div>
        </>
    );
}
