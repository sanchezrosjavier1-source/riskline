import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/**
 * Browser-tab favicon. A simplified variant of components/layout/Logo.tsx —
 * bold and reduced to two bars, since the fine dimension bracket in the full
 * mark disappears at 16-32px. Generated in code so there is no binary asset
 * to keep in sync with the palette.
 */
export default function Icon() {
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
          gap: 6,
          background: '#07090c',
          borderRadius: 8,
        }}
      >
        <div style={{ width: 16, height: 3.5, background: '#e0705e', borderRadius: 2 }} />
        <div style={{ width: 16, height: 3.5, background: '#e9edf3', borderRadius: 2 }} />
      </div>
    ),
    { ...size },
  );
}
