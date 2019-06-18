import React from "react";
import App, { Container } from "next/app";
import Layout from "../src/components/Layout/Layout";
import LayoutMobile from "../src/components/Layout/LayoutMobile";

export default class MyApp extends App {
	static async getInitialProps({ Component, router, ctx }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		return { pageProps };
	}

	state = {
		media: "xl",
		mediaListener: null
	};

	componentDidMount() {
		this.setMedia();
		const mediaListener = window.addEventListener("resize", this.setMedia);
		this.setState({ mediaListener: mediaListener });
	}

	componentWillUnmount() {
		const { mediaListener } = this.state;
		window.removeEventListener(mediaListener);
	}

	setMedia = () => {
		const { media } = this.state;
		const width = window.innerWidth;

		const standard = [1200, 992, 768, 576];
		const widthAlias = ["xl", "lg", "md", "sm"];

		for (var i in standard) {
			if (width >= standard[i]) {
				if (media !== widthAlias[i]) this.setState({ media: widthAlias[i] });
				return;
			}
		}

		if (width < 576) {
			if (media !== "xs") this.setState({ media: "xs" });
			return;
		}
	};

	render() {
		const { Component, pageProps } = this.props;
		const { media } = this.state;
		const MediaLayout = media !== "xs" ? LayoutMobile : Layout;

		return (
			<>
				<Container>
					<MediaLayout>
						<Component {...pageProps} media={this.state.media} />
					</MediaLayout>
				</Container>
			</>
		);
	}
}
