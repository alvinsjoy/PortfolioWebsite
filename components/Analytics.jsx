import Script from 'next/script';

const Analytics = () => (
  <>
    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-VRB81RLGRT" />
    <Script id="ga-script" strategy="lazyOnload">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-VRB81RLGRT');
      `}
    </Script>
  </>
);

export default Analytics;
