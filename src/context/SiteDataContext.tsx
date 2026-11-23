import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { DEFAULT_SERVICES } from '../data/defaultServices';
import { DEFAULT_SITE_SETTINGS } from '../data/defaultSiteSettings';
import { ServiceItem, SiteSettings } from '../types';

interface SiteDataContextValue {
  settings: SiteSettings;
  services: ServiceItem[];
  loadingSettings: boolean;
  loadingServices: boolean;
  isSettingsFromDb: boolean;
  isServicesFromDb: boolean;
}

const SiteDataContext = createContext<SiteDataContextValue | undefined>(undefined);

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);
  const [isSettingsFromDb, setIsSettingsFromDb] = useState(false);
  const [isServicesFromDb, setIsServicesFromDb] = useState(false);

  useEffect(() => {
    const settingsPath = 'site_settings/main';
    const unsubSettings = onSnapshot(
      doc(db, 'site_settings', 'main'),
      (snap) => {
        if (snap.exists()) {
          const data = snap.data() as Partial<SiteSettings>;
          setSettings({
            ...DEFAULT_SITE_SETTINGS,
            ...data,
            socialLinks: {
              ...DEFAULT_SITE_SETTINGS.socialLinks,
              ...(data.socialLinks || {}),
            },
          });
          setIsSettingsFromDb(true);
        } else {
          setSettings(DEFAULT_SITE_SETTINGS);
          setIsSettingsFromDb(false);
        }
        setLoadingSettings(false);
      },
      (error) => {
        setLoadingSettings(false);
        handleFirestoreError(error, OperationType.GET, settingsPath);
      },
    );

    const servicesPath = 'services';
    const servicesQuery = query(collection(db, 'services'), where('active', '==', true));
    const unsubServices = onSnapshot(
      servicesQuery,
      (snap) => {
        if (!snap.empty) {
          const items = snap.docs
            .map((d) => ({ ...(d.data() as Omit<ServiceItem, 'id'>), id: d.id }))
            .sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
          setServices(items);
          setIsServicesFromDb(true);
        } else {
          setServices(DEFAULT_SERVICES);
          setIsServicesFromDb(false);
        }
        setLoadingServices(false);
      },
      (error) => {
        setLoadingServices(false);
        handleFirestoreError(error, OperationType.LIST, servicesPath);
      },
    );

    return () => {
      unsubSettings();
      unsubServices();
    };
  }, []);

  return (
    <SiteDataContext.Provider
      value={{
        settings,
        services,
        loadingSettings,
        loadingServices,
        isSettingsFromDb,
        isServicesFromDb,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    throw new Error('useSiteData must be used inside SiteDataProvider');
  }
  return ctx;
}
