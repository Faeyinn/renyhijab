import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
                fill="#D48C84"
            />
            <path
                d="M15 15V35H21.5C26.5 35 29 32.5 29 29C29 26.5 27.5 25 25 24.5V24C27 23.5 28 21.5 28 19.5C28 16.5 26 15 21 15H15ZM19 18.5H21C23 18.5 24 19.5 24 21C24 22.5 23 23.5 21 23.5H19V18.5ZM19 27H21.5C24 27 25 28 25 30C25 32 24 33 21 33H19V27Z"
                fill="white"
            />
        </svg>
    );
}
