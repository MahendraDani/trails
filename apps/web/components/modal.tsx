"use client";
import { useSearchParams } from "next/navigation";

interface ModalProps {
  children: React.ReactNode;
}

function Modal({ children }: ModalProps) {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");

  return (
    <>
      {modal && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-white m-auto ">
            <div className="w-96">{children}</div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default Modal;
