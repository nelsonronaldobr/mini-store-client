import { Link } from 'react-router-dom';
import { UserCircleIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { Logo, SwitchTheme } from '../../components';
import { useAuthStore, useUiStore } from '../../hooks';
import { DropdownUser, ShoppingCart } from '..';

export const Navbar = () => {
    const { user } = useAuthStore();

    const { startToggleShoppingCart } = useUiStore();

    return (
        <header className='bg-amber-200 dark:bg-gray-800 shadow  animate__animated animate__fadeIn transition-colors'>
            <nav className='border-gray-200 px-4 lg:px-10 py-2.5'>
                <div className='flex flex-wrap justify-center md:justify-between items-center mx-auto max-w-screen-xl'>
                    {/* logo burgen queen */}
                    <Link to={'/'} className='flex items-center'>
                        <Logo className='w-16 mr-3' />
                        <span className='self-center text-3xl font-passion-one font-semibold whitespace-nowrap text-yellow-950 dark:text-white'>
                            Burger Queen
                        </span>
                    </Link>
                    <div className='flex items-center gap-6'>
                        <div className='relative'>
                            {user?.username ? (
                                /* dropdown the user, more options */
                                <DropdownUser />
                            ) : (
                                <Link
                                    to={'/auth'}
                                    className='flex items-center gap-2 py-2 w-full px-3 rounded text-amber-800 dark:text-white dark:hover:text-amber-200 transition-colors'>
                                    <UserCircleIcon className='h-8 w-8' />
                                    <span className='font-tilt-warp text-base'>
                                        Ingresar o Crear tu cuenta
                                    </span>
                                </Link>
                            )}
                        </div>
                        <button
                            onClick={startToggleShoppingCart}
                            className='text-amber-800 dark:text-white dark:hover:text-amber-200 transition-colors py-2 px-3'>
                            <ShoppingCartIcon className='h-7 w-7' />
                        </button>
                        {/* toggle theme dark or light */}
                        <div className='py-2 px-3'>
                            <SwitchTheme />
                        </div>
                    </div>
                    <ShoppingCart />
                </div>
            </nav>
            <nav className='dark:bg-gray-700 bg-yellow-900 px-4 lg:px-10 py-2.5'>
                <div className='overflow-x-auto'>
                    <ul className='flex capitalize select-none gap-4 flex-nowrap md:justify-between items-center list-none font-passion-one text-white text-lg whitespace-nowrap'>
                        <li className='p-2'>
                            <a
                                draggable={false}
                                href='#'
                                className='hover:text-amber-300 duration-200 transition-colors'>
                                Promos Para uno
                            </a>
                        </li>
                        <li className='p-2'>
                            <a
                                draggable={false}
                                href='#'
                                className='hover:text-amber-300 duration-200 transition-colors'>
                                Promos Para dos
                            </a>
                        </li>
                        <li className='p-2'>
                            <a
                                draggable={false}
                                href='#'
                                className='hover:text-amber-300 duration-200 transition-colors'>
                                Promos grupales
                            </a>
                        </li>
                        <li className='p-2'>
                            <a
                                draggable={false}
                                href='#'
                                className='hover:text-amber-300 duration-200 transition-colors'>
                                Las clasícas
                            </a>
                        </li>
                        <li className='p-2'>
                            <a
                                draggable={false}
                                href='#'
                                className='hover:text-amber-300 duration-200 transition-colors'>
                                Las Epicas
                            </a>
                        </li>
                        <li className='p-2'>
                            <a
                                draggable={false}
                                href='#'
                                className='hover:text-amber-300 duration-200 transition-colors'>
                                Las vegetales
                            </a>
                        </li>
                        <li className='p-2'>
                            <a
                                draggable={false}
                                href='#'
                                className='hover:text-amber-300 duration-200 transition-colors'>
                                Las comunes
                            </a>
                        </li>
                        <li className='p-2'>
                            <a
                                draggable={false}
                                href='#'
                                className='hover:text-amber-300 duration-200 transition-colors'>
                                Postres
                            </a>
                        </li>
                        <li className='p-2'>
                            <a
                                draggable={false}
                                href='#'
                                className='hover:text-amber-300 duration-200 transition-colors'>
                                Complementos
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};
