export default Page =>
	class withMedia extends React.Component {
		// xs : <576px  모바일
		// sm : >=576px
		// md : >=768px
		// lg : >=992px  PC
		// xl : >=1200px PC

		state = {
			media: "xl"
		};

		componentDidMount() {
			this.setMedia();
			window.addEventListener("resize", this.setMedia);
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
			return <Page {...this.props} media2={this.state.media} />;
		}
	};
