"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { mockReels, Reel } from '@/lib/mockData';

interface VideoContextType {
  videos: Reel[];
  addVideo: (video: Reel) => void;
  loading: boolean;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [videos, setVideos] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedVideos = localStorage.getItem('sniped_videos');
      const parsedVideos = savedVideos ? JSON.parse(savedVideos) : [];
      
      // Combine with mock data, avoiding duplicates
      const combined = [...parsedVideos, ...mockReels.filter(mock => 
        !parsedVideos.some((saved: Reel) => saved.id === mock.id)
      )];
      
      setVideos(combined);
    } catch (error) {
      console.error("Failed to load videos from localStorage:", error);
      setVideos(mockReels); // Fallback to mock data on error
    } finally {
      setLoading(false);
    }
  }, []);

  const addVideo = useCallback((video: Reel) => {
    setVideos(prevVideos => {
      const newVideos = [video, ...prevVideos];
      // Save only user-added videos to localStorage
      const userVideos = newVideos.filter(v => !mockReels.some(m => m.id === v.id));
      localStorage.setItem('sniped_videos', JSON.stringify(userVideos));
      return newVideos;
    });
  }, []);

  return (
    <VideoContext.Provider value={{ videos, addVideo, loading }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideos = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideos must be used within a VideoProvider');
  }
  return context;
};
