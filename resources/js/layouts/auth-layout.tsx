import AuthLayoutTemplate from '@/layouts/auth/auth-split-layout';

export default function AuthLayout({
    children,
    title,
    description,
    reverse,
    ...props
}: {
    children: React.ReactNode;
    title: string;
    description: string;
    reverse?: boolean;
}) {
    return (
        <AuthLayoutTemplate
            title={title}
            description={description}
            reverse={reverse}
            {...props}
        >
            {children}
        </AuthLayoutTemplate>
    );
}
