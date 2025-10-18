import { useState } from 'react'

const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);
  return {
    isOpenModal,
    handleOpenModal,
    handleCloseModal
  }
}

export default useModal