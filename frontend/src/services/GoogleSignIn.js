import { useEffect } from 'react';
import { useAuth } from '../AuthService';

export const useGoogleSignIn = () => {
    const { handleCallbackResponse } = useAuth();
  
    useEffect(() => {
      /* global google */
      if (typeof google !== 'undefined') {
        google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleCallbackResponse,
        });
  
        google.accounts.id.renderButton(
          document.getElementById('signInDiv'),
          { theme: 'outline', size: 'large' }
        );
  
        google.accounts.id.prompt();
      }
    }, [handleCallbackResponse]);
  };