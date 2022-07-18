import ContentLoader from 'react-content-loader'
import './loading.css'

const ImageGrid = props => (
  <div className='loader'>
  <ContentLoader
    width={'80%'}
    height={680}
    viewBox="0 0 800 575"
    backgroundColor="#d9d9d9"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="2" ry="2" width="1801" height="211" />
    <rect x="0" y="225" rx="2" ry="2" width="1801" height="211" />
    <circle cx="365" cy="466" r="12" />
    <circle cx="398" cy="465" r="12" />
    <circle cx="432" cy="465" r="12" />
    <rect x="471" y="454" rx="0" ry="0" width="52" height="24" />
    <rect x="273" y="453" rx="0" ry="0" width="52" height="24" />
    <circle cx="270" cy="465" r="12" />
    <circle cx="527" cy="466" r="12" />
  </ContentLoader>
  </div>
)

export default ImageGrid