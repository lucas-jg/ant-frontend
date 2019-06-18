import React, { Component } from "react";
import { Row, Col } from "antd";
import { EditorState } from "draft-js";
import { Editor as DraftEditor } from "react-draft-wysiwyg";
import ColorPic from "./ColorPic";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Editor.css";

class Editor extends Component {
	state = {
		editorState: EditorState.createEmpty()
	};

	onEditorStateChange = editorState => {
		console.log(JSON.stringify(editorState));

		this.setState({
			editorState
		});
	};

	render() {
		const { editorState } = this.state;
		return (
			<Row>
				<Col>
					<DraftEditor
						editorState={editorState}
						wrapperClassName="demo-wrapper"
						editorClassName="demo-editor"
						onEditorStateChange={this.onEditorStateChange}
						toolbar={{
							colorPicker: { component: ColorPic }
						}}
					/>
				</Col>
			</Row>
		);
	}
}

export default Editor;
