import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/form/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import TextLink from '@/components/ui/text-link';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <>
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="name"
                                    className="font-medium text-stone-700"
                                >
                                    Nama Lengkap
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Nama Anda"
                                    className="border-stone-200 bg-stone-50 text-stone-800 placeholder:text-stone-400 focus-visible:border-red-600 focus-visible:ring-red-600"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="email"
                                    className="font-medium text-stone-700"
                                >
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="nama@email.com"
                                    className="border-stone-200 bg-stone-50 text-stone-800 placeholder:text-stone-400 focus-visible:border-red-600 focus-visible:ring-red-600"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="password"
                                    className="font-medium text-stone-700"
                                >
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="border-stone-200 bg-stone-50 text-stone-800 placeholder:text-stone-400 focus-visible:border-red-600 focus-visible:ring-red-600"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="password_confirmation"
                                    className="font-medium text-stone-700"
                                >
                                    Konfirmasi Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="••••••••"
                                    className="border-stone-200 bg-stone-50 text-stone-800 placeholder:text-stone-400 focus-visible:border-red-600 focus-visible:ring-red-600"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full bg-gradient-to-r from-red-800 to-stone-900 text-white shadow-lg shadow-red-950/10 transition-all hover:from-red-900 hover:to-black active:scale-[0.98]"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && (
                                    <Spinner className="mr-2 text-white" />
                                )}
                                Daftar Akun
                            </Button>
                        </div>

                        <div className="mt-2 text-center text-sm text-stone-500">
                            Sudah punya akun?{' '}
                            <TextLink
                                href={login()}
                                tabIndex={6}
                                className="font-semibold text-red-700 decoration-red-300 underline-offset-4 hover:text-red-800 hover:underline"
                            >
                                Masuk disini
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = (page: React.ReactNode) => (
    <AuthLayout
        title="Buat Akun Baru"
        description="Isi detail di bawah untuk mendaftar"
        reverse={true}
    >
        {page}
    </AuthLayout>
);
