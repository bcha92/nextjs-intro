import Layout from '../components/layout/layout'
import HeadData from '../helpers/Head'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      {HeadData(null, "viewport", "initial-scale=1.0, width=device-width")}
      <Component {...pageProps} />
    </Layout>
  )
}