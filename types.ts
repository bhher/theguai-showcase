import { ReactNode } from 'react';

export interface CourseModule {
  id: number;
  title: string;
  items: string[];
  icon: ReactNode;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  githubLink?: string;
}

export interface Student {
  id: number;
  name: string;
  intro: string;
  link: string;
  githubLink?: string;
}

export interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
}

export interface SectionProps {
  className?: string;
}

// 카카오맵 타입 정의
declare global {
  interface Window {
    kakao: {
      maps: {
        Map: new (container: HTMLElement, options: any) => any;
        LatLng: new (lat: number, lng: number) => any;
        Marker: new (options: any) => any;
        InfoWindow: new (options: any) => any;
        CustomOverlay: new (options: any) => {
          setMap: (map: any) => void;
          getContent: () => HTMLElement | null;
        };
        ZoomControl: new () => any;
        MapTypeControl: new () => any;
        MapTypeId: {
          ROADMAP: any;
          SKYVIEW: any;
          HYBRID: any;
          OVERLAY: any;
        };
        ControlPosition: {
          TOP: any;
          TOPLEFT: any;
          TOPRIGHT: any;
          LEFT: any;
          RIGHT: any;
          BOTTOMLEFT: any;
          BOTTOM: any;
          BOTTOMRIGHT: any;
        };
        services: {
          Geocoder: new () => {
            addressSearch: (address: string, callback: (result: any[], status: any) => void) => void;
          };
          Status: {
            OK: string;
          };
        };
        load: (callback: () => void) => void;
        event?: {
          addListener: (target: any, type: string, handler: () => void) => void;
        };
      };
    };
  }
}