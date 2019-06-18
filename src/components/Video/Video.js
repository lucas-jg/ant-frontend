import {
	Player,
	ControlBar,
	VolumeMenuButton,
	ForwardControl,
	ReplayControl,
	PlaybackRateMenuButton,
	TimeDivider,
	CurrentTimeDisplay
} from "video-react";

// import "../../../assets/video/video.css";

const Video = () => (
	<div>
		<link rel="stylesheet" href="https://video-react.github.io/assets/video-react.css" />
		<Player autoPlay src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4">
			<ControlBar>
				<ReplayControl seconds={10} order={2.1} />
				<ReplayControl seconds={5} order={2.2} />
				<ForwardControl seconds={5} order={3.1} />
				<ForwardControl seconds={10} order={3.2} />
				<CurrentTimeDisplay order={4.1} />
				<TimeDivider order={4.2} />
				<PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
				<VolumeMenuButton order={3.3} />
			</ControlBar>
		</Player>
	</div>
);

export default Video;
