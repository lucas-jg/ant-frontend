import React, { Component } from 'react'

import EmailEditor from 'react-email-editor'

class Editor2 extends Component {
	render() {
		return (
			<>
				<div className="editor2">
					<h1>react-email-editor Demo</h1>

					<div>
						<button onClick={this.exportHtml}>Export HTML</button>
					</div>

					<EmailEditor ref={editor => (this.editor = editor)} />
				</div>
				<style jsx>{`
					.editor2 {
						margin: 0 -300px;
					}
				`}</style>
			</>
		)
	}

	exportHtml = () => {
		this.editor.exportHtml(data => {
			const { design, html } = data
			console.log('exportHtml', html)
		})
	}
}

export default Editor2
