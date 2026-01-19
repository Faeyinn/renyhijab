import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

export function UserInfo({
    user,
    showEmail = false,
}: {
    user: User;
    showEmail?: boolean;
}) {
    const getInitials = useInitials();

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-gradient-to-br from-red-100 to-rose-100 text-red-900">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="ml-2 grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-stone-900 transition-colors group-hover:text-red-900">
                    {user.name}
                </span>
                <span className="truncate text-[10px] font-medium tracking-tight text-stone-400 uppercase">
                    {showEmail ? user.email : 'Administrator'}
                </span>
            </div>
        </>
    );
}
