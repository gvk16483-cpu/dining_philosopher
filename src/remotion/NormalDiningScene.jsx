import { Composition } from 'remotion';

// Placeholder for the Normal Dining Remotion scene
export const NormalDiningScene = () => {
  return (
    <div style={{ width: '100%', height: '100%', background: 'black', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Normal Dining Scene (Remotion)</h1>
    </div>
  );
};

// Register the composition (Remotion CLI will pick this up)
export const RemotionRoot = () => (
  <>
    <Composition
      id="NormalDiningScene"
      component={NormalDiningScene}
      durationInFrames={600}
      fps={30}
      width={1280}
      height={720}
    />
  </>
);
