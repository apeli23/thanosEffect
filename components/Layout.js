import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function Layout({ title, children }) {
    return (
        <>
            <Head>
                <title>{title ? title + ' - thanosEffect' : 'thanosEffect'}</title>
                <meta name="description" content="Javascript Thanos" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex min-h-screen flex-col justify-between">
                <header className=' bg-gray-800 text-white font-bold'>
                    <nav
                        className="flex h-16 items-center px-4 justify-between shadow-md"
                    >
                        <Link href="/" legacyBehavior>
                            <a className="text-lg">thanosEffect</a>
                        </Link>
                        <div>
                            <Link href="https://www.apeli.tech/posts" legacyBehavior>
                                <a className="p-2">Documentation</a>
                            </Link>
                            <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-1 px-4 rounded">
                                Blog
                            </button>
                        </div>
                    </nav>
                </header>
                <main className="container m-auto px-4">{children}</main>
                <footer className="bg-gray-800 py-4">
                    <div className='container mx-auto flex justify-between items-center px-4'>
                        <div className="text-white">&copy; 2023 Apeli Brian</div>
                        <nav>
                            <ul className="flex text-white">
                                <li className="mr-6"><Link href="/terms" legacyBehavior><a>Terms of Service</a></Link></li>
                                <li><Link href="/privacy" legacyBehavior><a>Privacy Policy</a></Link></li>
                            </ul>
                        </nav>
                    </div>
                </footer>
            </div>
        </>
    );
}