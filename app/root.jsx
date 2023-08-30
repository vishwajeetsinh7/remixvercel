import { cssBundleHref } from "@remix-run/css-bundle";
import sharedStyle from '~/styles/shared.css'


import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
  useMatches,
} from "@remix-run/react";


import Error from '~/components/util/Error'

export const links = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : [{rel: 'stylesheet', href: sharedStyle}]),
];


export function meta() {
  return {
    title: 'sdif',
    // <meta name="description" content="Welcome to the web!" />
    description: "Welcome to the web!",
    // <meta name="theme-color" content="#f22" />
    "theme-color": "#f22",
  };
}


function Document ({title , children}) { 
  const matches = useMatches() 
  const disableJS = matches.some(match => match.handle?.disableJS)

  return ( 
    <html lang="en">
    <head>
      <title>{title && <title>{title}</title>}</title>
      <Links />
    </head>
    <body>
      {children}
      <ScrollRestoration />
      {!disableJS && <Scripts/>}
      <LiveReload />
    </body>
  </html>

  )
}



export default function App() {
  return (
    <Document>
      <Outlet/>
    </Document>
  );
}



export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document title={error.statusText}>
        <Error title={error.statusText}>
          <p>{error.data || 'some random erry i dont know'}</p>
          <p>Back to <Link to="/">Safty</Link></p>
        </Error>
      </Document>
    );
  } else if (error instanceof Error) {
    return (
      <Document title="An Error Occured">
        <Error title="Errorrrr">
      <div>
        <h1>Seond one Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
        </Error>
      </Document>
    );
  } else {
    return ( 
      <Document title="An Error Occured">
      <Error title="Errorrrr">
    <div>
      <h1>last one Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      
    </div>
      </Error>
    </Document>
    )
  }
}