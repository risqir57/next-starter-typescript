/* eslint-disable react/prop-types */
import { NextPageContext } from 'next';
import NextErrorComponent, { ErrorProps } from 'next/error';

const MyError = (props: ErrorProps): JSX.Element => {
  const { statusCode, title } = props;
  return <NextErrorComponent statusCode={statusCode} title={title} />;
};

MyError.getInitialProps = async (props: NextPageContext) => {
  const { res } = props;

  const errorInitialProps = await NextErrorComponent.getInitialProps({
    ...props
  });

  // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
  // getInitialProps has run
  // errorInitialProps.hasGetInitialPropsRun = true;
  // errorInitialProps.hasGetInitialPropsRun = true;

  // Running on the server, the response object (`res`) is available.
  //
  // Next.js will pass an err on the server if a page's data fetching methods
  // threw or returned a Promise that rejected
  //
  // Running on the client (browser), Next.js will provide an err if:
  //
  //  - a page's `getInitialProps` threw or returned a Promise that rejected
  //  - an exception was thrown somewhere in the React lifecycle (render,
  //    componentDidMount, etc) that was caught by Next.js's React Error
  //    Boundary. Read more about what types of exceptions are caught by Error
  //    Boundaries: https://reactjs.org/docs/error-boundaries.html
  if (res?.statusCode === 404) {
    // Opinionated: do not record an exception in Sentry for 404
    return { statusCode: 404 };
  }

  return errorInitialProps;
};

export default MyError;
