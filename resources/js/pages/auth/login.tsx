import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/form/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import TextLink from '@/components/ui/text-link';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <>
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
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
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="nama@email.com"
                                    className="border-stone-200 bg-stone-50 text-stone-800 placeholder:text-stone-400 focus-visible:border-red-600 focus-visible:ring-red-600"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label
                                        htmlFor="password"
                                        className="font-medium text-stone-700"
                                    >
                                        Password
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm text-red-700 transition-colors hover:text-red-800"
                                            tabIndex={5}
                                        >
                                            Lupa password?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className="border-stone-200 bg-stone-50 text-stone-800 placeholder:text-stone-400 focus-visible:border-red-600 focus-visible:ring-red-600"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="border-stone-300 text-white data-[state=checked]:border-red-700 data-[state=checked]:bg-red-700"
                                />
                                <Label
                                    htmlFor="remember"
                                    className="font-normal text-stone-600"
                                >
                                    Ingat saya
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full bg-gradient-to-r from-red-800 to-stone-900 text-white shadow-lg shadow-red-950/10 transition-all hover:from-red-900 hover:to-black active:scale-[0.98]"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && (
                                    <Spinner className="mr-2 text-white" />
                                )}
                                Masuk
                            </Button>
                        </div>

                        {canRegister && (
                            <div className="mt-2 text-center text-sm text-stone-500">
                                Belum punya akun?{' '}
                                <TextLink
                                    href={register()}
                                    tabIndex={5}
                                    className="font-semibold text-red-700 decoration-red-300 underline-offset-4 hover:text-red-800 hover:underline"
                                >
                                    Daftar disini
                                </TextLink>
                            </div>
                        )}
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-center text-sm font-medium text-green-700">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = (page: React.ReactNode) => (
    <AuthLayout
        title="Selamat Datang Kembali"
        description="Masuk untuk melanjutkan ke dashboard"
    >
        {page}
    </AuthLayout>
);
