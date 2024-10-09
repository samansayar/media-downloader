"use client"
import React, { useEffect, useState } from 'react'
import { setting } from '@/lib/site'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import Icon from './icons'

const navigationMenuTriggerStyle = cva(
    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
)

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <li><Link href={href} className='text-muted-foreground hover:text-foreground'>{children}</Link></li>
);

const SocialLink = ({ s }: { s: typeof setting.links[number] }) => (
    <Link href={s.url} className={cn(navigationMenuTriggerStyle({
        className: "text-muted-foreground"
    }))} target='_blank' rel='noreferrer' aria-label={`${s.name} link`}>
        <Icon name={s.name as any} size={28} color='currentColor' aria-hidden="true" />
    </Link>
);

type Props = {}

export default function Footer({ }: Props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return (
        <footer className='w-full px-6 absolute bottom-4 inset-x-0 mx-auto z-50'>
            <div className='space-y-8 py-3'>
                <div className='row'>
                    <div className='row-center gap-x-2.5 mx-auto'>
                        {setting.links.map((s, index) => (
                            <SocialLink key={index} s={s} />
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
