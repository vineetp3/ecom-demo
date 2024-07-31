import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import * as Tooltip from '@radix-ui/react-tooltip';
import Image from 'next/image';
import styles from './styles.module.css';

const OfferInfo = () => {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className={styles.IconButton}>
            <InfoCircledIcon />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="bottom" className={styles.TooltipContent} sideOffset={5}>
            <ShoppingCartIcon height={24} width={24} className='text-red-600 mr-2'/>
            Find
            <span className="mx-2 font-bold text-red-600">
              <Image src="/persona.png" height={30} width={80} alt="persona-icon" />
            </span>
            at the last step of checkout
            <Tooltip.Arrow className={styles.TooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default OfferInfo;
