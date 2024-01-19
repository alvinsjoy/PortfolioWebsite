import Head from 'next/head';

const Analytics = () => (
  <Head>
    <>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-VRB81RLGRT"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VRB81RLGRT');
          `,
        }}
      />
    </>
  </Head>
);

export default Analytics;
