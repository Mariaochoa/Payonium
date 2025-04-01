import React, { useEffect, useRef } from 'react';
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';
import styles from '../pages/transaction/Transaction.module.css';

const RampWidget = () => {
  const rampContainerRef = useRef(null); 

  useEffect(() => {
    if (rampContainerRef.current) {

      const ramp = new RampInstantSDK({
        hostAppName: 'Mi Aplicación Payonium', 
        hostLogoUrl: 'https://assets.ramp.network/misc/test-logo.png', 
        hostApiKey: 'TU_API_KEY', 
        variant: 'embedded-desktop', 
        containerNode: rampContainerRef.current, 
      });

      
      ramp.show();

     
      return () => {
        ramp.close();
      };
    }
  }, []); 

  return (
    <div>
     
     <div ref={rampContainerRef} className={styles.rampContainer}></div>
     
    </div>
  );
};

export default RampWidget;

