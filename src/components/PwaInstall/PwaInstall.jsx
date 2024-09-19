import React, { useState, useEffect } from 'react';

import { Button } from '@mui/material';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';


export const PwaInstall = () => {

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const [isStandalone, setIsStandalone] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    //Detects standalone mode on iOS
    useEffect(() => {
        const checkStandalone = () => {
            setIsStandalone(((window.navigator)?.standalone))
        }
        checkStandalone();
        window.addEventListener('appinstalled', checkStandalone);
        return () => {
            window.removeEventListener('appinstalled', checkStandalone);
        }
    }, []);

    useEffect(() => {
        if (isStandalone) {
            setIsStandalone(true);
        }
    }, [])

    //Detects chrome only event
    useEffect(() => {
        console.log('standalone', isStandalone);
        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();
            setDeferredPrompt(event);
        }
        console.log(deferredPrompt);

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        }
    }, []);

    const installApp = () => {
        console.log(deferredPrompt);
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Accepted');
                } else {
                    console.log('Rejected');
                }
                setDeferredPrompt(null);
            })
        }
    };

    const installIOS = () => {
        alert(`To install this app on iOS, make sure you are in Safari; then tap the share icon and select "Add to Home Screen"!`);
    }

    return (
        <div>
            {deferredPrompt && !isIOS &&
                <Button
                    style={{ color: 'black' }}
                    label='Install App'
                    onClick={installApp}
                >
                    <InstallMobileIcon />
                    Install App</Button>
            }

            {isIOS && !isStandalone &&
                <Button
                    style={{ color: 'black' }}
                    label='Install App'
                    onClick={installIOS}
                >
                    <InstallMobileIcon />
                    Install App</Button>
            }
        </div>
    )
}