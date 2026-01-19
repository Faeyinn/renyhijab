import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

import { home } from '@/routes';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-stone-50 p-6 font-sans text-stone-800 selection:bg-red-200 selection:text-red-900 md:p-10">
            {/* Earthy background blobs */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-red-100/20 opacity-40 blur-[100px]" />
                <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-red-100/30 opacity-50 blur-[100px]" />
            </div>

            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8 rounded-2xl border border-stone-100 bg-white p-8 shadow-xl shadow-stone-200/50">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 transition-transform hover:scale-105 active:scale-95"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-transparent">
                                <img
                                    src="/logo-rh.png"
                                    alt="Renyhijab Logo"
                                    className="h-16 w-16 object-contain"
                                />
                            </div>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1
                                className="text-2xl font-bold text-stone-800"
                                style={{
                                    fontFamily: 'Playfair Display, serif',
                                }}
                            >
                                {title}
                            </h1>
                            <p className="text-center text-sm text-stone-500">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
