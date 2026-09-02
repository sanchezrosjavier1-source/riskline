import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/**
 * iOS "Add to Home Screen" icon. iOS applies its own rounded-corner mask, so
 * this fills the full square — no radius or padding of its own.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 34,
          background: '#07090c',
        }}
      >
        <div style={{ width: 92, height: 20, background: '#e0705e', borderRadius: 10 }} />
        <div style={{ width: 92, height: 20, background: '#e9edf3', borderRadius: 10 }} />
      </div>
    ),
    { ...size },
  );
}
