import { ImageResponse } from 'next/og';

export async function generateOgImage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const fontSize = title.length > 40 ? 46 : title.length > 28 ? 54 : 64;
  const truncatedDesc =
    description.length > 130 ? description.slice(0, 130) + '...' : description;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background: 'linear-gradient(135deg, #171717 0%, #0a0a0a 50%, #1a1a1a 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: '#E31E27',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '28px',
                fontWeight: 900,
              }}
            >
              BA
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                Basit Ali
              </span>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#E31E27',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                Aluminum &amp; Glass Work
              </span>
            </div>
          </div>

          <div
            style={{
              width: '80px',
              height: '4px',
              background: '#E31E27',
              borderRadius: '2px',
            }}
          />

          <h1
            style={{
              fontSize: `${fontSize}px`,
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.15,
              margin: 0,
              maxWidth: '900px',
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: '22px',
              color: '#a3a3a3',
              lineHeight: 1.5,
              margin: 0,
              maxWidth: '800px',
            }}
          >
            {truncatedDesc}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #333',
            paddingTop: '24px',
          }}
        >
          <span style={{ fontSize: '16px', color: '#737373' }}>
            basitali-template1.vercel.app
          </span>
          <span style={{ fontSize: '16px', color: '#E31E27', fontWeight: 600 }}>
            0320-2740066
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
