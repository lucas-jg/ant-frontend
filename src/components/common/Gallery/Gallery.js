import React from 'react'

import ImageGallery from 'react-image-gallery'
import { compose } from 'recompose'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import '../../../../assets/gallery.css'
import { backendHost } from '../../../lib/common'
import GallyeryMainImage from '../../../../assets/image/gallery_main.png'

class Gallery extends React.Component {
    render() {
        // [{ original : url}]
        const {
            data: { loading, error, plans }
        } = this.props

        const galleryItems = [
            {
                original: 'http://pixel.sc:1337/uploads/a3a234bed38142bea6cc09fc804031cc.png'
            }
        ]

        if (error) return 'Error Loading Dishes'

        if (plans) {
            const result = plans[0].plannedclasses.map(planData => {
                return {
                    original: backendHost + planData.class.thumbnail[0].url
                }
            })

            return (
                <div style={{ margin: '0 -16px' }}>
                    <ImageGallery
                        items={[...galleryItems, ...result]}
                        showFullscreenButton={false}
                        useBrowserFullscreen={false}
                        showPlayButton={false}
                        showNav={false}
                        showBullets={true}
                        showThumbnails={false}
                        slideInterval={4000}
                        autoPlay
                    />
                </div>
            )
        } else {
            return <div />
        }
    }
}

const GET_BANNER_CLASS = gql`
    query {
        plans(where: { isBanner: true, isActive: true }) {
            title
            designPattern
            plannedclasses {
                class {
                    title
                    description
                    thumbnail {
                        url
                    }
                }
            }
        }
    }
`

export default compose(
    graphql(GET_BANNER_CLASS, {
        props: ({ data }) => ({ data })
    })
)(Gallery)
