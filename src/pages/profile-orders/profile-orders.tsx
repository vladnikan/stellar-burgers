import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrders,
  selectOrderData
} from '../../services/slices/orderSlice/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  /** TODO: взять переменную из стора
   * ВЗЯЛ
   */

  const orders = useSelector(selectOrderData);

  // const orders: TOrder[] = [];

  return <ProfileOrdersUI orders={orders} />;
};
