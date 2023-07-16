import { Switch } from '@headlessui/react';
import { useUiStore } from '../hooks';

import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export const SwitchTheme = () => {
    const { theme, startDarkMode, startLightMode } = useUiStore();

    const toggleDarkMode = (mode: boolean) => {
        if (mode) {
            startLightMode();
        } else {
            startDarkMode();
        }
    };

    return (
        <Switch
            checked={theme === 'light'}
            onChange={toggleDarkMode}
            className={`${theme === 'light' ? 'bg-amber-400' : 'bg-gray-700'}
  relative inline-flex h-[32px] w-[76px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
            <span className='absolute flex items-center top-1 left-1.5'>
                <MoonIcon className='w-5 h-5 text-white' />
            </span>
            <span
                aria-hidden='true'
                className={`${
                    theme === 'light' ? 'translate-x-0' : 'translate-x-11'
                }
    pointer-events-none z-10 inline-block h-[28px] w-[28px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
            <span className='absolute right-1.5 z-0 top-0.5'>
                <SunIcon className='w-6 h-6 text-white' />
            </span>
        </Switch>
    );
};
