import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';
export const alt = 'Thiệp mời cưới Công & Duyên';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation for the main site
export default async function OGImage() {
  // Use absolute URL for the background image
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://congduyen.vercel.app';
  const imageUrl = `${baseUrl}/hero.jpg`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          textAlign: 'center',
          padding: '40px',
          position: 'relative',
        }}
      >
        {/* Overlay to ensure text is readable */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1,
          }}
        />
        
        {/* Content */}
        <div style={{ 
          zIndex: 2, 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
          <h1 style={{ 
            fontSize: 72, 
            fontWeight: 'bold',
            margin: 0,
            marginBottom: 20,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}>
            Công & Duyên
          </h1>
          
          <h2 style={{ 
            fontSize: 36, 
            fontWeight: 'normal',
            margin: 0,
            marginBottom: 40,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}>
            Trân trọng kính mời
          </h2>
          
          <div style={{ 
            fontSize: 30, 
            fontWeight: 'bold',
            margin: 0,
            marginBottom: 40,
            padding: '10px 30px',
            background: 'rgba(249, 168, 212, 0.8)',
            borderRadius: 10,
            color: '#171717',
          }}>
            Lễ cưới - 24.05.2025
          </div>
          
          <p style={{ 
            fontSize: 24, 
            margin: 0,
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
          }}>
            Hân hạnh được đón tiếp quý vị
          </p>
        </div>
      </div>
    ),
    {
      ...size,
      emoji: 'twemoji',
    }
  );
}
