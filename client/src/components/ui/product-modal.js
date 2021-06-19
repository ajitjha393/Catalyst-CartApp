import * as React from 'react'
import {
	Modal,
	ModalBody,
	ModalFooter,
	ModalButton,
	SIZE,
	ROLE,
} from 'baseui/modal'
import { KIND as ButtonKind } from 'baseui/button'
import classes from './product-modal.module.css'

function ProductModal({ open, setOpen }) {
	return (
		<Modal
			onClose={() => setOpen(false)}
			closeable
			isOpen={open}
			animate
			autoFocus
			size={SIZE.default}
			role={ROLE.dialog}
		>
			<h2 className={classes.header}> Edit Product Detail</h2>
			<ModalBody>
				Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla
				ornare faucibus ex, non facilisis nisl. Maecenas aliquet mauris
				ut tempus.
			</ModalBody>
			<ModalFooter>
				<ModalButton
					kind={ButtonKind.tertiary}
					onClick={() => setOpen(false)}
				>
					Cancel
				</ModalButton>
				<ModalButton>Save</ModalButton>
			</ModalFooter>
		</Modal>
	)
}

export default ProductModal
