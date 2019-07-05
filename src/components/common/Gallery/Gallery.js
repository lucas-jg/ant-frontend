import React from 'react'

import ImageGallery from 'react-image-gallery'
import { compose } from 'recompose'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import '../../../../assets/gallery.css'
class Gallery extends React.Component {
    render() {
        // [{ original : url}]
        const {
            data: { loading, error, banner }
        } = this.props

        console.log(error)
        console.log(banner)

        if (error) return 'Error Loading Dishes'

        if (banner) {
            return (
                <>
                    <ImageGallery
                        items={banner.classes.map(classData => {
                            return {
                                original: `http://13.125.38.140:1337${classData.thumbnail.url}`
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
    query($id: ID!) {
        banner(id: $id) {
            id
            title
            classes {
                thumbnail {
                    url
                }
            }
        }
    }
`

export default compose(
    graphql(GET_BANNER_CLASS, {
        options: props => {
            return {
                variables: {
                    id: '5d1f6e7d67ce954f9a6325de'
                }
            }
        },
        props: ({ data }) => ({ data })
    })
)(Gallery)
