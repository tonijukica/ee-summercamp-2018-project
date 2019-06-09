import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <title>Kviskoteka</title>
          <link href="/static/images/favicon.ico"
            rel="icon" type="image/x-icon" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css"/>
          <link rel="stylesheet" href="/static/styles/css/default.css" />
          <link rel="stylesheet" href="/static/styles/css/spinner.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

          <link rel="stylesheet" href="/static/styles/css/header.css" />
          <link rel="stylesheet" href="/static/styles/css/carousel.css" />
          <link rel="stylesheet" href="/static/styles/css/topics.css" />
          <link rel="stylesheet" href="/static/styles/css/credits.css" />
          <link rel="stylesheet" href="/static/styles/css/results.css" />
          <link rel="stylesheet" href="/static/styles/css/quiz.css" />
          <link rel="stylesheet" href="/static/styles/css/login.css" />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
