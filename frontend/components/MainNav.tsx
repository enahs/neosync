'use client';

import Link from 'next/link';

import { siteConfig } from '@/app/config/site';
import { cn } from '@/libs/utils';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Logo className="w-5 object-scale-down" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav
        className={cn('flex items-center space-x-4 lg:space-x-6', className)}
        {...props}
      >
        <Link
          href="/"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === '/' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Overview
        </Link>
        <Link
          href="/jobs"
          className={cn(
            'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
            pathname === '/jobs' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Jobs
        </Link>
        <Link
          href="/runs"
          className={cn(
            'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
            pathname === '/runs' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Runs
        </Link>
        <Link
          href="/transformers"
          className={cn(
            'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
            pathname === '/settings' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Transformers
        </Link>
        <Link
          href="/connections"
          className={cn(
            'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
            pathname === '/connections'
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Connections
        </Link>

        <Link
          href="/settings"
          className={cn(
            'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
            pathname === '/settings' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Settings
        </Link>
      </nav>
    </div>
  );
}
