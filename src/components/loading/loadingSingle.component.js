import ContentLoader from 'react-content-loader'
import './loading.css'

const ImageGrid = props => (
  <div className='loader'>
  <ContentLoader
    width={'100%'}
    height={680}
    viewBox="0 0 800 575"
    backgroundColor="#d9d9d9"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="225" rx="2" ry="2" width="1801" height="211" />
  </ContentLoader>
  </div>
)

export default ImageGrid