import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';
import { home } from '@/routes';
import { type SharedData } from '@/types';

interface AuthLayoutProps {
    title?: string;
    description?: string;
    reverse?: boolean;
}

export default function AuthSplitLayout({
    children,
    title,
    description,
    reverse = false,
}: PropsWithChildren<AuthLayoutProps>) {
    const { name } = usePage<SharedData>().props;

    return (
        <div className="relative h-screen w-full overflow-hidden bg-stone-50 font-sans text-stone-900">
            {/* 
                Simple Two-Panel Layout with Sliding Image:
                The image panel slides between left and right positions.
                The form stays in the visible half.
            */}

            {/* Background layer for forms - always full width */}
            <div className="absolute inset-0 flex">
                {/* Left Half - Form visible when reverse=true (Register) */}
                <div className="flex h-full w-1/2 items-center justify-center overflow-y-auto p-8">
                    <div
                        className={cn(
                            'mx-auto flex w-full flex-col justify-center space-y-8 transition-opacity duration-500 sm:w-[400px]',
                            reverse
                                ? 'opacity-100'
                                : 'pointer-events-none opacity-0',
                        )}
                    >
                        <FormHeader
                            title={title}
                            description={description}
                            mobileLogo
                        />
                        <div className="relative">{reverse && children}</div>
                    </div>
                </div>

                {/* Right Half - Form visible when reverse=false (Login) */}
                <div className="flex h-full w-1/2 items-center justify-center overflow-y-auto p-8">
                    <div
                        className={cn(
                            'mx-auto flex w-full flex-col justify-center space-y-8 transition-opacity duration-500 sm:w-[400px]',
                            !reverse
                                ? 'opacity-100'
                                : 'pointer-events-none opacity-0',
                        )}
                    >
                        <FormHeader
                            title={title}
                            description={description}
                            mobileLogo
                        />
                        <div className="relative">{!reverse && children}</div>
                    </div>
                </div>
            </div>

            {/* Image Panel - Slides between left and right */}
            <div
                className={cn(
                    'absolute top-0 z-20 h-full w-1/2 transition-transform duration-700 ease-in-out',
                    reverse ? 'translate-x-[100%]' : 'translate-x-[0%]',
                )}
            >
                <div className="relative h-full w-full overflow-hidden">
                    {/* Background Image with Overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[20000ms] hover:scale-110"
                        style={{ backgroundImage: 'url("/hero-bg.png")' }}
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

                    <div className="relative z-30 flex h-full flex-col p-10 text-white">
                        <div className="flex items-center text-lg font-medium tracking-tight">
                            <Link
                                href={home()}
                                className="group flex items-center gap-3"
                            >
                                <div className="flex rounded-xl bg-white/10 p-1.5 backdrop-blur-md transition-all group-hover:bg-white/20">
                                    <img
                                        src="/logo-rh.png"
                                        alt="Logo"
                                        className="size-8 object-contain"
                                    />
                                </div>
                                <span className="font-semibold tracking-wide drop-shadow-sm">
                                    {name}
                                </span>
                            </Link>
                        </div>

                        <div className="mt-auto">
                            <blockquote
                                className="space-y-4"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                <p className="text-4xl leading-tight font-light tracking-tight drop-shadow-md lg:text-5xl">
                                    Elegansi dalam <br />
                                    <span className="font-serif text-red-300 italic">
                                        Kesederhanaan
                                    </span>
                                </p>
                                <footer className="text-sm font-medium tracking-widest uppercase opacity-70">
                                    &mdash; Reny Hijab Collection
                                </footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FormHeader({
    title,
    description,
    mobileLogo = false,
}: {
    title?: string;
    description?: string;
    mobileLogo?: boolean;
}) {
    return (
        <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
            {mobileLogo && (
                <div className="lg:hidden">
                    <Link
                        href={home()}
                        className="mb-4 flex items-center justify-center rounded-2xl bg-red-50 p-2 shadow-sm shadow-red-900/10"
                    >
                        <img
                            src="/logo-rh.png"
                            alt="Logo"
                            className="h-12 w-auto object-contain"
                        />
                    </Link>
                </div>
            )}
            <div className="space-y-2" data-aos="fade-up">
                <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
                    {title}
                </h1>
                <p className="text-balance text-stone-500">{description}</p>
            </div>
        </div>
    );
}
