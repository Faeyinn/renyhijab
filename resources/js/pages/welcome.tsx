import { Head, Link, usePage } from '@inertiajs/react';
import { Receipt, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=poppins:300,400,500,600,700&family=playfair-display:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-red-200 selection:text-red-900">
                {/* Header */}
                <header
                    className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                        scrolled
                            ? 'border-b border-stone-200 bg-white/90 py-3 shadow-md backdrop-blur-md'
                            : 'border-b border-transparent bg-transparent py-5'
                    }`}
                >
                    <div className="mx-auto max-w-7xl px-6">
                        <nav className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-transparent transition-all">
                                    <img
                                        src="/logo-rh.png"
                                        alt="Renyhijab Logo"
                                        className={`h-10 w-10 object-contain transition-all ${
                                            !scrolled
                                                ? 'brightness-0 invert'
                                                : ''
                                        }`}
                                    />
                                </div>
                                <span
                                    className={`text-xl font-bold transition-colors ${
                                        scrolled ? 'text-red-900' : 'text-white'
                                    }`}
                                    style={{
                                        fontFamily: 'Playfair Display, serif',
                                    }}
                                >
                                    Renyhijab
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className={`rounded-full px-6 py-2.5 text-sm font-medium shadow-md transition-all hover:-translate-y-0.5 ${
                                            scrolled
                                                ? 'bg-red-800 text-white shadow-red-200 hover:bg-red-900'
                                                : 'bg-white text-red-900 hover:bg-red-50'
                                        }`}
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                                                scrolled
                                                    ? 'text-stone-600 hover:bg-stone-100 hover:text-red-800'
                                                    : 'text-white hover:bg-white/10'
                                            }`}
                                        >
                                            Masuk
                                        </Link>
                                        {canRegister && (
                                            <Link
                                                href={register()}
                                                className={`rounded-full px-6 py-2.5 text-sm font-medium shadow-md transition-all hover:-translate-y-0.5 ${
                                                    scrolled
                                                        ? 'bg-red-800 text-white shadow-red-200 hover:bg-red-900'
                                                        : 'bg-white text-red-900 hover:bg-red-50'
                                                }`}
                                            >
                                                Daftar
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="pt-0">
                    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
                        {/* Hero Background with Dark Overlay */}
                        <img
                            src="/hero-bg.png"
                            alt="Hero Background"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60" />{' '}
                        {/* Dark Overlay */}
                        <div className="relative mx-auto max-w-7xl text-center">
                            <h1
                                className="mb-6 text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-7xl"
                                style={{
                                    fontFamily: 'Playfair Display, serif',
                                }}
                                data-aos="fade-up"
                            >
                                Kelola Koleksi{' '}
                                <span className="text-red-700">Renyhijab</span>{' '}
                                Dengan Mudah
                            </h1>

                            <p
                                className="mx-auto mb-10 max-w-2xl text-lg text-stone-100"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                Dedikasi untuk manajemen operasional Renyhijab
                                yang lebih profesional. Pantau stok hijab,
                                kelola data pelanggan setia, dan catat transaksi
                                harian dalam satu sistem yang elegan.
                            </p>

                            <div
                                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-800 to-red-950 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-red-950/20 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-950/30"
                                    >
                                        Buka Dashboard
                                        <div className="flex h-5 w-5 items-center justify-center">
                                            <img
                                                src="/logo-rh.png"
                                                alt=""
                                                className="h-5 w-5 object-contain brightness-0 invert"
                                            />
                                        </div>
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={register()}
                                            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-800 to-red-950 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-red-950/20 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-950/30"
                                        >
                                            Mulai Sekarang
                                            <div className="flex h-5 w-5 items-center justify-center">
                                                <img
                                                    src="/logo-rh.png"
                                                    alt=""
                                                    className="h-5 w-5 object-contain brightness-0 invert"
                                                />
                                            </div>
                                        </Link>
                                        <Link
                                            href={login()}
                                            className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-8 py-4 text-lg font-semibold text-stone-700 transition-all hover:border-red-800 hover:bg-red-50 hover:text-red-900"
                                        >
                                            Masuk ke Akun
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="bg-white px-6 py-24">
                        <div className="mx-auto max-w-7xl">
                            <div className="mb-16 text-center">
                                <h2
                                    className="mb-4 text-3xl font-bold text-stone-900 sm:text-4xl"
                                    style={{
                                        fontFamily: 'Playfair Display, serif',
                                    }}
                                    data-aos="fade-down"
                                >
                                    Fitur Unggulan
                                </h2>
                                <p className="mx-auto max-w-2xl text-stone-600">
                                    Solusi komprehensif untuk operasional toko
                                    yang efisien
                                </p>
                            </div>

                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                                {[
                                    {
                                        icon: ShoppingBag,
                                        title: 'Koleksi Hijab',
                                        desc: 'Manajemen inventaris produk yang terstruktur dan mudah diakses.',
                                    },
                                    {
                                        icon: Users,
                                        title: 'Database Pelanggan',
                                        desc: 'Pusat data pelanggan untuk membangun relasi jangka panjang.',
                                    },
                                    {
                                        icon: Receipt,
                                        title: 'Rekap Transaksi',
                                        desc: 'Pencatatan penjualan akurat dengan detail invoice profesional.',
                                    },
                                    {
                                        icon: TrendingUp,
                                        title: 'Analisa Bisnis',
                                        desc: 'Monitor pertumbuhan usaha melalui dashboard statistik.',
                                    },
                                ].map((feature, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative overflow-hidden rounded-2xl border border-stone-100 bg-stone-50 p-8 transition-all hover:-translate-y-1 hover:border-red-200 hover:bg-white hover:shadow-xl"
                                        data-aos="fade-up"
                                        data-aos-delay={idx * 100}
                                    >
                                        <div className="relative">
                                            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-stone-100 bg-white text-red-800 shadow-sm transition-colors duration-300 group-hover:bg-red-800 group-hover:text-white">
                                                <feature.icon className="h-7 w-7" />
                                            </div>
                                            <h3 className="mb-2 text-xl font-semibold text-stone-900">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-stone-600">
                                                {feature.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="bg-stone-50 px-6 py-24">
                        <div className="mx-auto max-w-4xl">
                            <div
                                className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-red-900 to-stone-950 p-12 text-center shadow-2xl shadow-red-950/20 lg:p-16"
                                data-aos="zoom-in"
                            >
                                {/* Texture overlay */}
                                <div
                                    className="absolute inset-0 opacity-10"
                                    style={{
                                        backgroundImage:
                                            'radial-gradient(circle, #fff 2px, transparent 2.5px)',
                                        backgroundSize: '30px 30px',
                                    }}
                                ></div>

                                <div className="relative">
                                    <h2
                                        className="mb-4 text-3xl font-bold text-white sm:text-4xl"
                                        style={{
                                            fontFamily:
                                                'Playfair Display, serif',
                                        }}
                                    >
                                        Tingkatkan Kualitas Bisnis Anda
                                    </h2>
                                    <p className="mx-auto mb-8 max-w-xl text-lg text-red-100">
                                        Saatnya mengelola operasional Renyhijab
                                        dengan cara yang lebih modern, efisien,
                                        dan tetap elegan sesuai gaya hijab Anda.
                                    </p>
                                    {!auth.user && (
                                        <Link
                                            href={login()}
                                            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-red-900 shadow-lg transition-all hover:-translate-y-1 hover:bg-red-50 hover:shadow-xl"
                                        >
                                            Mulai Sekarang
                                            <div className="flex h-5 w-5 items-center justify-center">
                                                <img
                                                    src="/logo-rh.png"
                                                    alt=""
                                                    className="h-5 w-5 object-contain"
                                                />
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="border-t border-stone-200 bg-white px-6 py-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-transparent">
                                    <img
                                        src="/logo-rh.png"
                                        alt="Renyhijab Logo"
                                        className="h-8 w-8 object-contain"
                                    />
                                </div>
                                <span
                                    className="font-bold text-stone-800"
                                    style={{
                                        fontFamily: 'Playfair Display, serif',
                                    }}
                                >
                                    Renyhijab
                                </span>
                            </div>
                            <p className="text-sm text-stone-500">
                                © 2026 Renyhijab. Dibuat untuk fashion muslimah
                                modern.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
