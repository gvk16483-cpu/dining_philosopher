import React from 'react';
import { Composition } from 'remotion';
import { DiningPhilosophersRemotion } from './DiningPhilosophersRemotion';

export const RemotionRoot = () => (
  <>
    <Composition
      id="DiningPhilosophersRemotion"
      component={DiningPhilosophersRemotion}
      durationInFrames={600}
      fps={30}
      width={1280}
      height={720}
    />
  </>
);
