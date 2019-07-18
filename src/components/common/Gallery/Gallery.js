import React from 'react'

import ImageGallery from 'react-image-gallery'
import { compose } from 'recompose'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import '../../../../assets/gallery.css'
import { backendHost } from '../../../lib/common'

class Gallery extends React.Component {
    render() {
        // [{ original : url}]
        const {
            data: { loading, error, plans }
        } = this.props

        console.log(error)
        console.log(backendHost)

        if (error) return 'Error Loading Dishes'

        if (plans) {
            return (
                <>
                    <ImageGallery
                        items={plans[0].plannedclasses.map(planData => {
                            return {
                                original: backendHost + planData.class.thumbnail[0].url
                            }
                        })}
                        showFullscreenButton={false}
                        useBrowserFullscreen={false}
                        showPlayButton={false}
                        showNav={false}
                        showBullets={true}
                        showThumbnails={false}
                        slideInterval={4000}
                        autoPlay
                    />
                </>
            )
        } else {
            return <div>wfefew</div>
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
