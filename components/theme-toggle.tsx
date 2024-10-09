
import { delay, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

const iconVariants = {
    initial: { opacity: 0, x: -8 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.2, delay: 0.3 }
};

export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(theme === 'dark');
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setIsDark(newTheme === 'dark');
        setTimeout(() => setTheme(newTheme), 0);
    };


    return (
        <Button onClick={toggleTheme} variant={'ghost'} size={'icon'}>
            <motion.div
                animate={{ rotate: isDark ? 360 : 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div
                    key={theme}
                    {...iconVariants}
                >
                    {!isDark ? <Moon /> : <Sun />}
                </motion.div>
            </motion.div>
        </Button>
    );
}
