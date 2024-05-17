import Script from 'next/script';

export default function GAnalytics() {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-0VETRJFPDN"
      />
      <Script id="ga-script" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0VETRJFPDN');
        `}
      </Script>
    </>
  );
}
