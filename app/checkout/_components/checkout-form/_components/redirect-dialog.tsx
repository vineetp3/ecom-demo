'use client';

import * as Dialog from '@radix-ui/react-dialog';
// import { useRouter } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';

const RedirectingDialog = ({
  open,
  setOpen,
  redirectUrl
}: {
  open: boolean;
  redirectUrl: string;
  // eslint-disable-next-line no-unused-vars
  setOpen: (arg: boolean) => void;
}) => {

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>
            
            <span className={`${styles.colorBanding} ml-2`}>Redirecting </span> you to Persona Pay</Dialog.Title>
          <Dialog.Description className={styles.DialogDescription}>
            <Image src="/redirect-icon.png" height={100} width={120} alt="redirect-icon" />
          </Dialog.Description>
          <p className="text-center font-normal text-gray-600">
            Click
            <Link href={redirectUrl} className='mx-1 text-blue-500'>here</Link>
            if redirection does not happen within 3 seconds..
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default RedirectingDialog;
