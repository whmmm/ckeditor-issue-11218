import { Plugin } from '@ckeditor/ckeditor5-core'
import { downcastImageAttribute } from '@ckeditor/ckeditor5-image/src/image/converters'

/**
 * mathType 预览回显插件
 */
export class MathTypeImgView extends Plugin {
  init() {
	let editor = this.editor
	const schema = editor.model.schema
	const conversion = editor.conversion

	schema.extend('imageInline', {
	  allowAttributes: ['data-mathml', 'class']
	})

	let imgUtils = editor.plugins.get('ImageUtils')

	conversion.for('downcast').add(downcastImageAttribute(imgUtils, 'imageInline', 'data-mathml'))
	conversion.for('upcast').attributeToAttribute({
	  model: 'data-mathml',
	  view: {
		name: 'img',
		key: 'data-mathml'
	  },
	})

	conversion.for('upcast').attributeToAttribute({
	  model: 'class',
	  view: {
		name: 'img',
		key: 'class'
	  },
	})

	/* editor.conversion.for('upcast').elementToAttribute({
	  view: {
		name: 'img',
		attributes: {
		  'class': /.+/
		}
	  },
	  model: {
		key: 'imageClass',
		value: viewElement => viewElement.getAttribute('class')
	  }
	}) */

	// Both the data and the editing pipelines are affected by this conversion.
	conversion.for('downcast').add(dispatcher => {
	  // Headings are represented in the model as a "heading1" element.
	  // Use the "low" listener priority to apply the changes after the headings feature.
	  dispatcher.on('insert:imageInline', (evt, data, conversionApi) => {
		const viewWriter = conversionApi.writer
		let elem = conversionApi.mapper.toViewElement( data.item )
		debugger
		viewWriter.addClass('my-heading', elem)
	  }, { priority: 'low' })
	})

	/* conversion.for('downcast').add(downcastImageAttribute(imgUtils,'imageInline','class'))
	conversion.for('upcast').attributeToAttribute({
	  view: {
		name: 'img',
		key: 'class'
	  },
	  model: 'class'
	}) */
  }
}
