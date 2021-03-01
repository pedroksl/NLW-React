import Document, { Html, Head, Main, NextScript } from 'next/document'

/**
 * Document class. This file is loaded once and can be used
 * to pre-load stuff that is unmutable and repeatdly used
 * throughout the application, i.e. fonts
 */
export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="favicon.png" type="image/png" />
                    
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}