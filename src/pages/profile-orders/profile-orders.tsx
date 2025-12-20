import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { selectOrderData } from '../../services/slices/orderSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора
   * ВЗЯЛ
   */

  const orders = useSelector(selectOrderData);

  // const orders: TOrder[] = [];

  return <ProfileOrdersUI orders={orders} />;
};
